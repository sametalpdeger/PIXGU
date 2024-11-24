import { clsxMerge } from '@/utils/clsxMerge'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const Btn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <button
      onClick={() => setIsLoading(true)}
      className={clsxMerge(
        `flex aspect-square h-full w-full items-center border-[#ffffff93] border-[0.2rem] justify-center rounded-lg bg-[#5865F2] p-1 drop-shadow-[0_0px_2px_#5865F2]`,
        {
          'animate-pulse opacity-50 animate-infinite': isLoading,
        },
      )}
    >
      <FontAwesomeIcon
        icon={faDiscord}
        fontSize={35}
        color={'rgba(255,255,255,0.85)'}
      />
    </button>
  )
}
