'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useHostingHealth,
  useHostPainterData,
  useIsGameStopped,
  useMatchStatus,
  usePeers,
  usePlayers,
  useWhoIsPainter,
  usePixelHistory,
  useCoins,
  useSpectators,
  useLastPixel,
  useGuessedPlayers,
} from '@/zustand/store'

export const ResetStates = () => {
  useEffectOnce(() => {
    return () => {
      useHostPainterData.getState().reset()
      useMatchStatus.getState().reset()
      useHostingHealth.getState().reset()
      usePeers.getState().reset()
      usePlayers.getState().reset()
      useWhoIsPainter.getState().reset()
      useIsGameStopped.getState().reset()
      usePixelHistory.getState().reset()
      useCoins.getState().reset()
      useSpectators.getState().reset()
      useLastPixel.getState().reset()
      useGuessedPlayers.getState().reset()
    }
  })

  return null
}
