import {
  useCoins,
  useHostingHealth,
  usePlayers,
  useSpectators,
} from '@/zustand/store'
import type { User } from 'lucia'
import type { Guest } from '@/types'
import type SimplePeer from 'simple-peer'
import { sendToPeer } from '@/utils/sendToPeer'
import { positiveLog } from '@/utils/positiveLog'
import { handlePeerDatas } from './funcs/handlePeerDatas'
import { sendEveryoneNewPlayer } from './funcs/sendEveryoneNewPlayer'
import { sendPrevPlayersToNewPlayer } from './funcs/sendPrevPlayersToNewPlayer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const onPeerConnect = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
  user: User | Guest,
) =>
  peer.on('connect', () => {
    positiveLog(`CONNECTED TO ${userID}`)

    if (usePlayers.getState().value.count === 1)
      useHostingHealth.getState().set('readyToStart')

    const status = useHostingHealth.getState().status
    const isSpectator = status === 'gameIsStarted'

    if (isSpectator) {
      sendToPeer(peer, {

        event: 'youAreSpectator',
      })

      useSpectators.getState().add(userID)
      Object.keys(useCoins.getState().coins).forEach((ID) => {
        sendToPeer(peer, {

          event: 'coin',
          data: {
            to: ID,
            amount: useCoins.getState().coins[ID]!,
          },
        })
      })

    }

    canvasWorker.current.postMessage({
      e: 5
    } as CanvasWorkerOnMsgData)

    usePlayers.getState().addPlayer(userID, {
      ...user,
    })

    handlePeerDatas(userID, roomID)
    sendPrevPlayersToNewPlayer(userID)
    sendToPeer(peer, {

      event: 'prevSpectators',
      data: useSpectators.getState().playersIDs,
    })
    sendEveryoneNewPlayer(userID, isSpectator)
  })
