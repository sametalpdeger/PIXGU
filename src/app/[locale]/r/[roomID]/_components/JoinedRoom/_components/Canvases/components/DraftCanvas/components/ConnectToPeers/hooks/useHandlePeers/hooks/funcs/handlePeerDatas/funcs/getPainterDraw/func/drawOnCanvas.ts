import type { CanvasData, RGBAObj } from '@/types'
import { fillOnePixel } from '@/utils/room'

export const drawOnCanvas = (
  rgba: RGBAObj,
  canvasData: CanvasData,
  cordinates: { x: number; y: number },
) => {
  const { x, y } = cordinates
  const { r, g, b, a } = rgba
  const { draft, main, cellPixelLength } = canvasData

  canvasData.painter.pixelHistory[`${x}_${y}`] = {
    r: r,
    g: g,
    b: b,
    a: a,
  }

  const mctx = main!.getContext('2d')!
  const dctx = draft!.getContext('2d')!

  fillOnePixel(cellPixelLength, draft!, x, y, rgba)
  mctx.drawImage(draft!, 0, 0) // copy drawing to main
  dctx.clearRect(0, 0, draft!.width, draft!.height) // clear draft
}
