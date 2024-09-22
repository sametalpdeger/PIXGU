import { api } from '@/trpc/client'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { sendToPainterPeer } from '@/utils/sendToPainterPeer'
import { useWhoIsPainter } from '@/zustand/store'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'

export const updatePainterToPlayers = async (roomID: string) => {
  const whoIsPainter = useWhoIsPainter.getState().value
  if (whoIsPainter.status === 'thereIsNoPainter') return

  const painterID = whoIsPainter.painterID
  sendToAllPeers({
    from: 'host',
    event: 'currentPainter',
    data: painterID,
  })

  const themes = await api.gameRoom.getThemes.query({
    roomID,
  })

  useHostPainterData.getState().painterSelectingTheme(themes, roomID)

  sendToAllPeers(
    {
      from: 'host',
      event: 'painterSelectingTheme',
    },
    {
      except: [painterID],
    },
  )

  sendToPainterPeer({
    from: 'host',
    event: 'selectTheme',
    data: themes,
  })
}
