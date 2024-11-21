import { arrsEqual } from '@/utils'
import { useControls, type ControlsState } from '@/zustand/store'
import { useEffect } from 'react'

export const useShortcut = ({ keyName, onShortcut }: Args) => {
    const combination = useControls(s => s.combination)
    const keyValue = useControls(s => s.keys[keyName])

    useEffect(() => {
        if (arrsEqual(combination, keyValue)) onShortcut()
    }, [combination, keyValue])
}


type Args = {
    keyName: keyof ControlsState['keys']
    onShortcut: () => void
}