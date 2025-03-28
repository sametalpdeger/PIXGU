
'use client'

import { usePlayers } from '@/zustand/store'

export const Count = () => {
  const count = usePlayers((state) => state.value.count)

  return <div className="text-white">{count}/10</div>
}
