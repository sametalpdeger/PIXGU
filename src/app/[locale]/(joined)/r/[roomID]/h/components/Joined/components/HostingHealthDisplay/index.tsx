// TODO: optimize this component
'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { StartBtn } from './components/StartBtn'
import { CopyBtn } from './components/CopyBtn'
import { JoinBtn } from './components/JoinBtn'
import { useHostingHealth } from '@/zustand/store'
import { useRoomIDStore } from '@/zustand/provider'
import { StopBtn } from './components/StopBtn'
import { HavingIssuesBtn } from './components/HavingIssuesBtn'
import { Svg } from '@/components/Svg'

export const HostingHealthDisplay = () => {
  const status = useHostingHealth((s) => s.status)
  const roomID = useRoomIDStore((state) => state.roomID)

  const radialGradientColor = (() => {
    switch (status) {
      case 'gameIsStarted':
        return 'rgba(52, 211, 153, 0.438)'
      case 'readyToStart':
        return '#34d3cb70'
      case 'waitingForPlayers':
        return '#348bd370'
      case 'gameEnded':
        return '#ff00f229'
    }
  })()

  const lgText = (() => {
    switch (status) {
      case 'gameIsStarted':
        return 'Started'
      case 'readyToStart':
        return 'Ready'
      case 'waitingForPlayers':
        return 'Waiting For Players'
      case 'gameEnded':
        return 'Game has ended'
    }
  })()

  const smText = (() => {
    switch (status) {
      case 'gameIsStarted':
        return 'Game is running right now, you can use host tools to manage game'
      case 'readyToStart':
        return 'Everything is ready to start'
      case 'waitingForPlayers':
        return 'You can copy the link and share it with your friends'
      case 'gameEnded':
        return "Check out the final results. Feel free to start a new game whenever you're ready."
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
        `relative flex h-full w-full font-[500] animate-fade select-none flex-col items-center justify-center gap-5 border-b-8  text-center drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] ease-in-out animate-delay-700`,
        {
          'animate-pulse border-b-[#34d399ff] text-emerald-400':
            status === 'gameIsStarted',
          'border-b-[#34d3cb] text-[#34d3cb]': status === 'readyToStart',
          'border-b-[#348bd3] text-[#348bd3]': status === 'waitingForPlayers',
          'border-b-[#ff00e6a4] text-[#ff00f7a4]': status === 'gameEnded',
        },
      )}
    >
      <div className="flex w-[90%] flex-col items-center gap-[0.1rem]">
        <div
          className={clsxMerge(
            'from-[30%] via-[#ffffff90] to-[70%] text-[2.5rem] leading-[2.9rem]',
            {
              'inline-block bg-gradient-to-r from-emerald-400 to-emerald-400 bg-clip-text text-transparent':
                status === 'gameIsStarted',
              'inline-block bg-gradient-to-r from-[#34d3cb] to-[#34d3cb] bg-clip-text text-transparent':
                status === 'readyToStart',
              'inline-block bg-gradient-to-r from-[#348bd3] to-[#348bd3] bg-clip-text text-transparent':
                status === 'waitingForPlayers',
              'inline-block bg-gradient-to-r from-[#ff00e6a4] to-[#ff00f7a4] bg-clip-text text-transparent':
                status === 'gameEnded',
            },
          )}
        >
          {lgText}
        </div>
        <div className="text-[1.2rem]  leading-6 opacity-75 lg:w-[50%]">
          {smText}
        </div>
      </div>
      <div className="flex h-8 flex-row w-[90%] flex-wrap justify-center gap-3 drop-shadow-[0_0px_10px_rgba(0,0,0,0.2)]">
        {status === 'readyToStart' ? <StartBtn roomID={roomID} /> : null}
        {status === 'gameIsStarted' ? <StopBtn roomID={roomID} /> : null}
        {status === 'readyToStart' || status === 'waitingForPlayers' ? <CopyBtn /> : null}
        {status === 'readyToStart' || status === 'waitingForPlayers' ? <JoinBtn /> : null}

        <HavingIssuesBtn />
      </div>
      <div className='absolute bottom-2 w-full flex items-center justify-center animate-fade-down aniamte-delay-[1000ms]'>
        <Svg src='scroll-down-svgrepo-com.svg' alt="star" className="h-10 w-full opacity-20" />
      </div>
    </div>
  )
}
