import { type ReactNode } from 'react'

const GradientContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full rounded-lg bg-gradient-to-tl from-[rgb(255,249,166)] via-[rgb(255,238,81)] to-[rgb(255,247,139)] p-1 shadow-[0_0px_30px_0px_#fcf93973]">
      <div className="h-full w-full rounded-md bg-[rgba(0,0,0,0.6)] p-2">
        <div className="flex h-full w-full flex-col items-center rounded-md bg-[rgba(255,255,255,0.4)] drop-shadow-[0_0px_6px_rgba(0,0,0,1)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default GradientContainer
