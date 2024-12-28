import { storePaintersAccess } from '@/store'
import { api } from '@/trpc/client'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPainterPeer } from '@/utils/sendToPainterPeer'
import { sToMs } from '@/utils/sToMs'
import { postMsgToHostTimerWorker } from '@/workers'
import { usePlayers, usePlayersPowerups, useTotalMatchCount, useWhoIsPainter } from '@/zustand/store'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'

export const updatePainterToPlayers = async (roomID: string) => {
  const whoIsPainter = useWhoIsPainter.getState().value
  if (whoIsPainter.status === 'thereIsNoPainter') return

  console.log('sending current painter...', {
    painterID: whoIsPainter.painterID,
    roomID,
    useTotalMatchCount: useTotalMatchCount.getState().value,
    whoIsPainter: whoIsPainter,
    storePaintersAccess,
  })
  const painterID = whoIsPainter.painterID!
  sendToAllPeers({
    event: 'currentPainter',
    data: painterID,
  })

  const themes = await api.gameRoom.getThemes.query({
    roomID,
  })

  useHostPainterData.getState().painterSelectingTheme(themes, roomID)
  postMsgToHostTimerWorker({
    ID: 'PAINTER_TIME_IS_UP',
    type: 'timeout',
    event: 'start',
    ms: sToMs(20),
  })

  sendToAllPeers(
    {

      event: 'painterSelectingTheme',
    },
    {
      except: [painterID],
    },
  )

  sendToPainterPeer({

    event: 'selectTheme',
    data: themes,
  })

  usePlayersPowerups.getState().setPainterCardsWhileThemeIsSelecting(painterID)
  usePlayers.getState().getPlayersIDs().forEach(ID => {
    if (ID === painterID) return
    usePlayersPowerups.getState().setGuessrCardsWhileThemeIsSelecting(ID)
  })
}
