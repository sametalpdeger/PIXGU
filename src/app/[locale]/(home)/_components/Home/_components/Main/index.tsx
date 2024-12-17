import './styles/scrollbars.css'
import RightSide from './components/RightSide'
import LeftSide from './components/LeftSide'
import type { Locale } from '@/types'

export const Main = ({ locale }: Props) => {
  return (
    <main className=" flex animate-[position_15s_ease-in-out_infinite] flex-row gap-2  rounded-md bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)]  to-[rgb(242,255,187)] p-2 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] xxs:w-[95%] lg:w-[55rem]">
      <LeftSide locale={locale} />
      <RightSide />
    </main>
  )
}

type Props = {
  locale: Locale
}