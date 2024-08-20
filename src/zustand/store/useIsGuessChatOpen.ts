import { create } from 'zustand'

type State = { value: boolean }

type Action = {
  close: () => void
  open: () => void
}

export const useIsGuessChatOpen = create<State & Action>((set, get) => ({
  value: true,

  close: () =>
    set({
      value: false,
    }),

  open: () =>
    set({
      value: true,
    }),
}))
