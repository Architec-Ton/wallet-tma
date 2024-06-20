export type GameListItemType = {
  thumb: string
  title: string
  description: string
  id: string
  rate: number
}

export type GameCategoryType<T> = {
  title: string
  id: string
  items: T
}

export type GameListType<G> = GameCategoryType<G>[]

export interface IGame {
  id: string
  title: string
  description: string
  thumb: string
  album: string[]
  category: number
  resources: GameResource[]
  rate: number
}

export interface GameResource {
  thumb: string
  title: string
  description: string
  link: string
  type: 'web' | 'telegram' | 'coin'
}

export type TGameLeader = {
  name: string
  asset: string
  gameId: string
  time: string
  totalCoins: string
}