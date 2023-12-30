import { type ReactNode } from 'react'
import Nav from './components/Nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-row bg-slate-400">
      <Nav />
      <main className="z-0 flex h-full grow flex-col overflow-y-auto bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[hsla(189,100%,86%,0)] to-[rgba(242,255,187,0.4)] p-2">
        {children}
      </main>
    </div>
  )
}
