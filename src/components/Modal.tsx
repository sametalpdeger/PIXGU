'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useEventListener } from '@/hooks/useEventListener'

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter()



  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      router.back()
    }
  }

  return (
    <div className="absolute z-50 h-full w-full bg-[rgba(0,0,0,0.4)]">
      {children}
    </div>
  )
}

export default Modal
