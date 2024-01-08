import Slider from '@/components/Slider'
import ColorPicker from './components/ColorPicker'

const CanvasTools = () => {
  return (
    <div className="flex h-full w-[10rem] flex-col gap-1 overflow-y-auto rounded-md bg-[rgba(255,255,255,0.5)] p-3">
      <ColorPicker />
      <Slider />
    </div>
  )
}

export default CanvasTools
