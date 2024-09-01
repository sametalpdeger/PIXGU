'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useWindowEventListener } from '@/hooks/useWindowEventListener'
import { StartBtn } from './components/StartBtn'
import { CopyBtn } from './components/CopyBtn'
import { JoinBtn } from './components/JoinBtn'
import { useHostingHealth } from '@/zustand/store'
import { Fragment } from 'react'
import { useRoomIDStore } from '@/zustand/provider'
import { StopBtn } from './components/StopBtn'
import { HavingIssuesBtn } from './components/HavingIssuesBtn'

export const HostingHealthDisplay = () => {
  const status = useHostingHealth((s) => s.status)
  const roomID = useRoomIDStore((state) => state.roomID)

  useWindowEventListener('offline', () =>
    useHostingHealth.getState().set('networkError'),
  )

  const radialGradientColor = (() => {
    switch (status) {
      case 'gameIsStarted':
        return 'rgba(52, 211, 153, 0.438)'
      case 'networkError':
        return 'rgba(211, 52, 100, 0.438)'
      case 'loading':
        return 'rgba(255, 184, 70, 0.400)'
      case 'readyToStart':
        return '#34d3cb70'
      case 'waitingForPlayers':
        return '#348bd370'
    }
  })()

  const lgText = (() => {
    switch (status) {
      case 'gameIsStarted':
        return 'Started'
      case 'networkError':
        return 'Network Error'
      case 'readyToStart':
        return 'Ready'
      case 'waitingForPlayers':
        return 'Waiting For Players'
      case 'loading':
        return 'Loading...'
    }
  })()

  const smText = (() => {
    switch (status) {
      case 'gameIsStarted':
        return 'Game is running right now, you can use host tools to manage game'
      case 'networkError':
        return 'Your internet connection has been interrupted, please refresh the page when you reconnect to the internet and then ask other players to refresh'
      case 'readyToStart':
        return 'Everything is ready to start'
      case 'waitingForPlayers':
        return 'You can copy the link and share it with your friends'
      default:
        return ''
    }
  })()

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(20rem at center, ${radialGradientColor}, transparent)`,
      }}
      className={clsxMerge(
        `relative flex h-full w-full select-none flex-col items-center justify-center gap-5 border-b-8  text-center drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] ease-in-out animate-delay-700`,
        {
          'border-b-[#e0376ada] text-[rgba(224,55,106,0.853)]':
            status === 'networkError',
          'animate-pulse border-b-[#ffb746] text-[rgb(255,183,70)]':
            status === 'loading',
          'animate-pulse border-b-[#34d399ff] text-emerald-400':
            status === 'gameIsStarted',
          'border-b-[#34d3cb] text-[#34d3cb]': status === 'readyToStart',
          'border-b-[#348bd3] text-[#348bd3]': status === 'waitingForPlayers',
        },
      )}
    >
      <div className="flex w-[90%] flex-col gap-[0.1rem]">
        <div
          className={clsxMerge(
            'from-[30%] via-[#ffffff90] to-[70%] text-[2.5rem] leading-[2.9rem]',
            {
              'inline-block bg-gradient-to-r from-[rgba(224,55,106,0.853)] to-[rgba(224,55,106,0.853)] bg-clip-text text-transparent':
                status === 'networkError',
              'inline-block bg-gradient-to-r from-[rgb(255,183,70)] to-[rgb(255,183,70)] bg-clip-text text-transparent':
                status === 'loading',
              'inline-block bg-gradient-to-r from-emerald-400 to-emerald-400 bg-clip-text text-transparent':
                status === 'gameIsStarted',
              'inline-block bg-gradient-to-r from-[#34d3cb] to-[#34d3cb] bg-clip-text text-transparent':
                status === 'readyToStart',
              'inline-block bg-gradient-to-r from-[#348bd3] to-[#348bd3] bg-clip-text text-transparent':
                status === 'waitingForPlayers',
            },
          )}
        >
          {lgText}
        </div>
        <div className="text-[1.2rem] opacity-75">{smText}</div>
      </div>
      <div className="flex flex-row gap-3 drop-shadow-[0_0px_10px_rgba(0,0,0,0.2)]">
        <StartBtn roomID={roomID} />
        <StopBtn roomID={roomID} />
        <JoinBtn />
        <CopyBtn />
        <HavingIssuesBtn />
      </div>
      <div className="absolute bottom-4 w-[90%] text-[0.9rem] text-[#ffffff63]"></div>
    </div>
  )
}
