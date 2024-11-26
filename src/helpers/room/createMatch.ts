import { updatePainterToPlayers } from './updatePainterToPlayers'
import { getNextArrElmI, mToMs, sToMs, sendToAllPeers } from '@/utils'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import {
  useCoins,
  useGuessedPlayers,
  useHostCanvasesData,
  useHostingHealth,
  useHostPainterData,
  usePlayers,
  useSocketIO,
  useSpectators,
  useWhoIsPainter,
} from '@/zustand/store'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker, type CanvasWorkerOnMsgData } from '@/workers'


export const createMatch = async (roomID: string) => {
  const isSpectator = useSpectators.getState().isSpectator
  const players = usePlayers.getState().get
  const setCurrentPainter = useWhoIsPainter.getState().setCurrentPainter
  const isFirstMatch = useMatchStatus.getState().value.isFirstMatch
  const isGameEnded = useMatchStatus.getState().value.matchCount === 10
  const playersIDs = usePlayers
    .getState()
    .getPlayersIDs()
    .filter((ID) => !isSpectator(ID))


  const { mctx } = useHostCanvasesData.getState()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)

  console.log({
    isGameEnded,
    isFirstMatch,
    matchCount: useMatchStatus.getState().value.matchCount,
    playersIDs,
    players,
  })
  if (isGameEnded) {
    useSocketIO.getState().io!.emit('game-started', false)
    sendToAllPeers({
      event: 'gameEnded',
      data: {
        coins: useCoins.getState().getSortedByAmount(),
      },
    })

    useHostingHealth.getState().set('gameEnded')
    useHostPainterData.getState().reset()
    useWhoIsPainter.getState().reset()
    useMatchStatus.getState().reset()
    postMsgToHostTimerWorker({
      ID: 'MATCH_ENDED',
      event: 'stop',
    })
    postMsgToHostTimerWorker({
      ID: 'MATCH_REMAIN_TIME',
      event: 'stop',
    })
    useSpectators.getState().reset()
    useCoins.getState().reset()
    postMsgToCanvasWorker({ e: 'reset' })
    useGuessedPlayers.getState().reset()

    postMsgToHostTimerWorker({
      ID: 'GAME_ENDED',
      type: 'timeout',
      event: 'start',
      ms: sToMs(20),
    })

    return
  }

  if (players().count >= 2) {
    useGuessedPlayers.getState().reset()
    const whoIsPainter = useWhoIsPainter.getState().value

    if (whoIsPainter.status === 'thereIsNoPainter') {
      const nextPainterI = 0
      const { index: newNextPainterI } = getNextArrElmI(
        playersIDs,
        nextPainterI,
      )

      setCurrentPainter({
        amIPainter: false,
        nextPainterI: newNextPainterI,
        painterID: playersIDs[nextPainterI]!,
      })

      useHostPainterData.getState().reset()
      updatePainterToPlayers(roomID)

      return
    }

    const { nextPainterI, painterID } = whoIsPainter

    const { index: newNextPainterI } = getNextArrElmI(playersIDs, nextPainterI!)

    setCurrentPainter({
      amIPainter: false,
      nextPainterI: newNextPainterI,
      painterID: playersIDs[nextPainterI!]!,
    })

    useHostPainterData.getState().reset()
    updatePainterToPlayers(roomID)
  }
}
