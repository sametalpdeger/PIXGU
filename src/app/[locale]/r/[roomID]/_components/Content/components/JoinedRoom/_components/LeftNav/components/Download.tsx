'use client'

import { useCanvasesMainData } from '@/zustand/store'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import img from '@/svg/download-svgrepo-com.svg'
import { Button } from './Button'

export const Download = () => {
  const linkRef = useRef<HTMLAnchorElement>()

  useEffect(() => {
    linkRef.current = document.createElement<'a'>('a')
    document.querySelector<HTMLCanvasElement>('main-canvas')!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const download = () => {
    const mainCanvas = useCanvasesMainData.getState().main
    if (!mainCanvas) return

    const link = linkRef.current!
    const date = new Date()

    const year = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const hour = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`
    const fileName = `${hour}_${year}`

    link.download = `${fileName}.png`
    link.href = mainCanvas.toDataURL()
    link.click()
  }

  return (
    <Button
      key={'download'}
      onKeyDown={(e, after) => {
        if (
          e.ctrlKey &&
          e.key == 's' &&
          (e.target as HTMLElement).tagName !== 'INPUT'
        ) {
          e.preventDefault()
          download()
          after()
        }
      }}
      onMouseDown={download}
      className="size-9 rounded-lg bg-[#ffffff4a] p-1"
      icon={<Image src={img} alt="download" className="opacity-60" />}
    />
  )
}
