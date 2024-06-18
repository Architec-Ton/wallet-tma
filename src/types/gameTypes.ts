export type GameListItemType = {
  thumbnail: string
  title: string
  description: string
  id: number
}

export type GameCategoryType<T> = {
  title: string
  id: number
  items: T
}

export type GameListType<G> = GameCategoryType<G>[]

export interface IGame {
  id: number | string
  title: string
  description: string
  thumbnail: string
  album: string[]
  category: number
  resources: GameResource[]
}

export interface GameResource {
  thumbnail: string
  title: string
  description: string
  link: string
  type: 'web' | 'telegram' | 'coin'
}

export type TGameLeader = {
  name: string
  asset: string
  gameId: number
  time: string
  totalCoins: string
}