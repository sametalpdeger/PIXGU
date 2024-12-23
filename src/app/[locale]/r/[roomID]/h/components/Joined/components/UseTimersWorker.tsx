"use client"

import { createMatch, gameEnded } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { storePaintersAccess } from '@/store'
import type { RTCStats } from '@/types/rtcStats'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'
import { violetLog } from '@/utils/violetLog'
import { getHostTimerWorker, postMsgToHostTimerWorker, terminateTimerWorker, type TimerWorkerPostMsgData } from '@/workers'
import { useCoins, useGuessedPlayers, useHostingHealth, useHostPainterData, useMatchStatus, usePeers, usePlayers, usePlayersPing, useWhoIsPainter } from '@/zustand/store'

export const UseTimersWorker = ({ roomID }: Props) => {
    useEffectOnce(() => {
        const timerWorker = getHostTimerWorker()

        timerWorker.current.onmessage = (e: any) => {
            const data = e.data as TimerWorkerPostMsgData
            const { ID } = data

            switch (ID) {
                case 'GAME_ENDED': {
                    if (usePlayers.getState().value.count > 1)
                        useHostingHealth.getState().set('readyToStart')
                    else useHostingHealth.getState().set('waitingForPlayers')


                    break
                }

                case 'PAINTER_TIME_IS_UP': {
                    const data = useHostPainterData.getState().value
                    if (data.status !== 'painterSelectingTheme') return

                    sendToAllPeers({
                        event: 'painterSelectedThemeTimeIsUp',
                    })

                    if (storePaintersAccess.value.paintersToBeSelected.length === 1) gameEnded()
                    else createMatch(roomID)
                    break
                }

                case 'MATCH_REMAIN_TIME':
                    console.log('MATCH_REMAIN_TIME')
                    useMatchStatus.getState().decreaseRemainSeconds()
                    break

                case 'MATCH_ENDED': {
                    const painterID = useWhoIsPainter.getState().value.painterID!

                    postMsgToHostTimerWorker({
                        ID: 'MATCH_REMAIN_TIME',
                        event: 'stop',
                    })

                    if (useGuessedPlayers.getState().playersIDs.length === 0) useCoins.getState().decrease(painterID, 100)

                    sendToPeerWithID(painterID, {

                        event: 'yourCoin',
                        data: {
                            amount: useCoins.getState().coins[painterID]!,
                        },
                    })

                    sendToAllPeers({
                        event: 'coin',
                        data: {
                            to: painterID,
                            amount: useCoins.getState().coins[painterID]!,
                        },
                    }, {
                        except: [painterID]
                    })

                    createMatch(roomID)
                    break
                }
                case 'RTT':
                    Object.keys(usePeers.getState().peers).forEach((ID) => {
                        const peer = usePeers.getState().peers[ID]!.peer as any

                        peer.getStats((err: Error | null, stats: RTCStats[]) => {
                            if (err) {
                                console.error('Failed to get peer stats:', err);
                                peer.destroy()
                                return
                            }

                            stats.forEach((report) => {
                                if (report.type === 'candidate-pair') {
                                    const rtt = report.currentRoundTripTime * 1000
                                    if (!rtt) {
                                        violetLog(`RTT is undefined`)
                                        return
                                    }

                                    violetLog(`RTT ${rtt}ms`)
                                    usePlayersPing.getState().set(rtt, ID)
                                }
                            })
                        })
                    })
            }

            return () => {
                terminateTimerWorker()
            }
        }
    })

    return null
}

type Props = {
    roomID: string
}