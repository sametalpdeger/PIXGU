'use client'

import { useSpring, animated } from '@react-spring/web'
import { useEventListener } from 'usehooks-ts'
import { useRef, type ReactNode } from 'react'

export const Button = ({ onKeyDown, className, onClick, icon }: Props) => {
  const clickSfxRef = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/crystal_panel_button.mp3'),
  )
  const documentRef = useRef(document)
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      duration: 400,
    },
  }))

  const clickAnimation = () =>
    api.start({
      from: {
        scale: 0.9,
      },
      to: {
        scale: 1,
      },
    })

  useEventListener('keydown', (e) => onKeyDown(e), documentRef)

  const handleClick = () => {
    clickSfxRef.current.play()
    clickAnimation()
    onClick?.()
  }

  return (
    <animated.button
      style={springs}
      onClick={handleClick}
      className={`flex size-9 flex-row items-center gap-2 rounded-lg bg-[#ffffff35] to-transparent p-1 ${className}`}
    >
      {icon}
    </animated.button>
  )
}

type Props = {
  onKeyDown: (e: KeyboardEvent) => void
  className?: string
  onClick?: () => void
  icon: ReactNode
}
