import type { Color } from '@/types/color'
import type { IntRange } from '@/types/intRange'

type RotationCheck = IntRange<1, 360> | number extends number
    ? ' You have to pass a number between 1 and 360 '
    : never

type SvgProps = {
    width?: string
    height?: string
    color?: Color
    rotation?: RotationCheck
}

const Triangle = ({
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
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
        </svg>
    )
}

export default Triangle
