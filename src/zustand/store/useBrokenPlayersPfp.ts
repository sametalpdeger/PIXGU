import { create } from 'zustand'

type State = { value: Set<string> }

type Action = {
  add: (userID: string) => void
  isBroken: (userID: string) => boolean
}

export const useBrokenPlayersPfp = create<State & Action>((set, get) => ({
  value: new Set<string>([]),
  add: (userID) => get().value.add(userID),
  isBroken: (userID) => get().value.has(userID),
}))
