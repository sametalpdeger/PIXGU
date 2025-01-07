import { fillOnePixel } from '@/helpers/room'
import type { RainingColorsPowerupData } from '@/types'
import { useCanvasesMainData, usePowerups } from '@/zustand/store'

export const rainingColors = (data: RainingColorsPowerupData) => {
    const { cellPixelLength, mctx } = useCanvasesMainData.getState()

    for (let i = 0; i < data.length; i++) {
        const [color, coors] = data[i]!
        fillOnePixel(mctx!, coors[0], coors[1], cellPixelLength!, color)
    }

    usePowerups.getState().setPowerupInActive('rainingColors')
}