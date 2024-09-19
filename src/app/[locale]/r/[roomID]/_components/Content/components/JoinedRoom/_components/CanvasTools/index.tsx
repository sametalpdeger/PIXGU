import { ColorPicker } from './components/ColorPicker'
import { GridSwitcher } from './components/GridSwitcher'
import { Pixelify_Sans } from 'next/font/google'
import { Wrapper } from './components/Wrapper'
import { EyeDropper } from './components/EyeDropper'
import { Trash } from './components/Trash'
import { Rectangle } from './components/Rectangle'
import { Circle } from './components/Circle'
import { XY } from './components/XY'
import { Bucket } from './components/Bucket'

const pixelyfySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400'],
})

const CanvasTools = () => {
  return (
    <Wrapper>
      <div className="flex w-full flex-col items-start gap-1">
        <XY />
        <div
          className={`${pixelyfySans.className} z-10 grid w-full animate-fade grid-cols-5 gap-2 rounded-md bg-[rgba(255,255,255,0.15)] p-2 duration-700`}
        >
          <ColorPicker />
          <EyeDropper />
          <Bucket />
          <Trash />
          <Rectangle />
          <Circle />
          <GridSwitcher />
        </div>
      </div>
    </Wrapper>
  )
}

export default CanvasTools
