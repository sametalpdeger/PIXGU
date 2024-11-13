import type { Player } from '@/zustand/store'
import type { User } from 'lucia'
import type { Powerup } from './powerups'
import type { PixelHistoryStoreValueHistory } from '@/store'

/**
 * WebRTCConnData is the type of data that
 *  is sent over the WebRTC connection.
 */
export type WebRTCConnData = WebRTCConnDataFromHost | WebRTCConnDataFromClient

export type GuessChatFromHost = {
  event: 'guessChat'
  data: {
    from: string
    msgID: string
    msg: string
  }
}

export type YourGuessChatFromHost = {
  event: 'yourGuessChat'
  data: {
    msgID: string
    msg: string
  }
}

export type GuessChatFromClient = {
  event: 'guessChat'
  data: {
    msg: string
  }
}

export type WinnersChatFromHost = {
  event: 'winnersChat'
  data: {
    msgID: string
    from: string
    msg: string
  }
}

export type YourWinnersChatFromHost = {
  event: 'yourWinnersChat'
  data: {
    msgID: string
    msg: string
  }
}

export type WinnersChatFromClient = {
  event: 'winnersChat'
  data: {
    msg: string
  }
}

export type PainterPencil = {
  event: 'painterPencil'
  data: {
    x: number
    y: number
    color: Uint8ClampedArray
    size: number
  }
}

export type PainterEraserOrPencilOut = {
  event: 'painterEraserOrPencilOut'
}

export type PainterEraser = {
  event: 'painterEraser'
  data: {
    x: number
    y: number
    size: number
  }
}

export type PainterTrash = {
  event: 'painterTrash'
}

export type PainterBucket = {
  event: 'painterBucket'
  data: {
    x: number
    y: number
    color: Uint8ClampedArray
  }
}

export type PrevCanvas = {
  event: 'prevCanvas'
  data: PixelHistoryStoreValueHistory['rgb']

}

export type PrevPlayers = {
  event: 'prevPlayers'
  data: Record<string, Player>
}

export type CurrentPainter = {
  event: 'currentPainter'
  data: string
}

export type PlayerLeft = {
  event: 'playerLeft'
  data: {
    ID: string
  }
}

export type PlayerJoined = {
  event: 'playerJoined'
  data: Player & {
    isSpectator: boolean
  }
}

type PingPongData = {
  data: {
    date: number
    something: 'Ad eiusmod qui in aliqua irure. Ipsum eu elit enim mollit adipisicing incididunt.'
  }
}

export type Ping = {
  event: 'ping'
} & PingPongData

export type Pong = {
  event: 'pong'
} & PingPongData

export type SelectThemeFromHost = {
  event: 'selectTheme'
  data: [string, string]
}

export type SelectThemeFromClient = {
  event: 'selectTheme'
  data: string
}

export type PainterSelectedTheme = {
  event: 'painterSelectedTheme'
}

export type PainterSelectingTheme = {
  event: 'painterSelectingTheme'
}

export type PainterCouldNotSelectTheme = {
  event: 'painterCouldNotSelectTheme'
  data: 'timeIsUp' | 'playerLeft'
}

export type Guessed = {
  event: 'guessed'
  data: {
    ID: string
  }
}

export type Coin = {
  event: 'coin'
  data: {
    to: string
    amount: number
  }
}

export type PrevCoins = {
  event: 'prevCoins'
  data: Record<User['id'], number>
}

export type YourCoin = {
  event: 'yourCoin'
  data: {
    amount: number
  }
}

export type YouGuessed = {
  event: 'youGuessed'
}

export type YouAreSpectator = {
  event: 'youAreSpectator'
}

export type Spectator = {
  event: 'spectator'
  data: {
    ID: string
  }
}

export type PrevSpectators = {
  event: 'prevSpectators'
  data: string[]
}

export type GameIsStopped = {
  event: 'gameIsStopped'
}

export type EveryoneGuessed = {
  event: 'everyoneGuessed'
}

export type GameEnded = {
  event: 'gameEnded'
  data: {
    coins: [string, number][]
  }
}

export type MarketItem = {
  event: 'marketItem'
  data: {
    name: Powerup
  }
}

export type MarketItemPurchased = {
  event: 'marketItemPurchased'
  data: {
    userID: string
    name: 'letterHint'
  }
}

export type WebRTCConnDataFromHost = (
  | PlayerLeft
  | PlayerJoined
  | PrevPlayers
  | CurrentPainter
  | GuessChatFromHost
  | WinnersChatFromHost
  | YourGuessChatFromHost
  | YourWinnersChatFromHost
  | Pong
  | SelectThemeFromHost
  | PainterSelectedTheme
  | PainterSelectingTheme
  | PainterCouldNotSelectTheme
  | Guessed
  | Coin
  | YourCoin
  | PrevCoins
  | YouGuessed
  | YouAreSpectator
  | Spectator
  | PrevSpectators
  | GameIsStopped
  | EveryoneGuessed
  | PainterBucket
  | GameEnded
  | PainterTrash
  | PainterEraser
  | PainterPencil
  | MarketItemPurchased
  | PrevCanvas
  | PainterEraserOrPencilOut
) & {
  from: 'host'
}

/**
 * DirectlyFromClient is the type of data that is sent directly from the client.
 */
export type WebRTCConnDataFromClient = (
  | PainterEraserOrPencilOut
  | WinnersChatFromClient
  | GuessChatFromClient
  | PainterPencil
  | PainterEraser
  | PainterBucket
  | Ping
  | PainterTrash
  | SelectThemeFromClient
  | MarketItem
) & {
  from: 'client'
}
