'use client'

import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useMatchStatusClient, useSelectThemePanel } from '@/zustand/store'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'

export const Btn = ({ theme, position }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const btnSfx = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/fade_btn.ogg'),
  )

  useEffect(() => {
    btnSfx.current.volume = 1
  }, [])

  const onClick = () => {
    if (!btnRef.current) return
    btnSfx.current.play()

    btnRef.current.disabled = true
    useSelectThemePanel.getState().selectTheme({
      theme,
    })

    useMatchStatusClient.getState().setTheme(theme)

    sendToHostPeer({
      event: 'selectTheme',
      data: theme,
    })
  }
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={clsx(
        `h-full grow break-words text-[1rem] text-[#00000093] hover:text-violet-600`,
        {
          'animate-fade-right': position === 1,
          'animate-fade-left': position === 2,
        },
      )}
    >
      {theme}
    </button>
  )
}

type Props = {
  theme: string
  position: 1 | 2
}
