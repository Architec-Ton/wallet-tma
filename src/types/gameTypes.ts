export type GameListItemType = {
  icon: string;
  title: string;
  subtitle: string;
  id: string;
  rating: number;
};

export type GameCategoryType<T> = {
  title: string;
  id: string;
  apps: T;
};

export type GameListType<G> = GameCategoryType<G>[];

export interface IGame {
  id: string;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
  category: number;
  resources: GameResource[];
  rate: number;
}

export interface GameResource {
  thumb: string;
  title: string;
  description: string;
  link: string;
  type: 'web' | 'telegram' | 'coin';
}

export type TGameLeader = {
  name: string;
  asset: string;
  gameId: string;
  time: string;
  totalCoins: string;
};

export type GameFilterType = {
  name?: boolean;
  rate?: boolean;
  date?: boolean;
  direction?: string;
};
