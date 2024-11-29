import { create } from 'zustand'

type UserID = string
type State = {
  coins: Record<UserID, number>
  prevCoins: Record<UserID, number>
}

type Action = {
  newMatch: () => void
  add: (userID: string, amount: number) => void
  get: (userID: string) => number
  set: (userID: string, amount: number) => void
  decrease: (userID: string, amount: number) => void
  getSortedByAmount: () => [string, number][]
  reset: () => void
}

const initValue: State = {
  coins: {},
  prevCoins: {},
}

export const useCoins = create<State & Action>((set, get) => ({
  ...initValue,

  newMatch: () =>
    set({
      ...get(),
      prevCoins: {
        ...get().coins,
      },
    }),
  add: (userID, amount) =>
    set({
      coins: {
        ...get().coins,
        [userID]: parseFloat(((get().coins[userID] ?? 0) + amount).toFixed(2)),
      },
    }),

  set: (userID, amount) =>
    set({
      coins: {
        ...get().coins,
        [userID]: parseFloat(amount.toFixed(2)),
      },
    }),


  decrease: (userID, amount) =>
    set({
      coins: {
        ...get().coins,
        [userID]: parseFloat(((get().coins[userID] ?? 0) - amount).toFixed(2)),
      },
    }),

  getSortedByAmount: () => {
    const coins = get().coins

    let sortable: [string, number][] = []
    for (let userID in coins) {
      sortable.push([userID, coins[userID] ?? 0])
    }

    const sorted = sortable.sort((a, b) => {
      return a[1] - b[1]
    })

    return sorted
  },

  get: (userID) => get().coins[userID] ?? 0,

  reset: () => set(initValue),
}))
