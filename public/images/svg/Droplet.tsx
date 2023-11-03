'use client'

import type { Color } from '@/types/color'
import type { IntRange } from '@/types/intRange'

type RotationCheck = IntRange<1, 360>
type SvgProps = {
  width: string
  height: string
  color: Color
  rotation?: RotationCheck
}

const Droplet = ({
  width = '1rem',
  height = '1rem',
  color = 'rgba(0, 0, 0, 0.5)',
  rotation,
}: SvgProps): JSX.Element => {
  return (
    // Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      className={`fill-[${color}] ${rotation}`}
      viewBox="0 0 384 512"
    >
      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
    </svg>
  )
}

export default Droplet
