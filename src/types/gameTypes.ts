export type GameListItemType = {
  icon: string;
  title: string;
  subtitle: string;
  id: string;
  rating: number;
  date?: number;
};

export type GameCategoryType<T> = {
  title: string;
  id: string;
  apps: T;
};

export type GameListType<G> = GameCategoryType<G>[];

export interface MarketingItem {
  id: string;
  image: string;
  url: string;
  title?: string;
}

export type AppsList = {
  categories: GameListType<GameListItemType[]>;
  marketings: MarketingItem[];
};

export interface IGame {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url?: string;
  icon?: string;
  gallery: string[];
  category: number;
  resources: GameResource[];
  rating: number;
}

export interface GameResource {
  icon: string;
  title: string;
  description: string;
  url: string;
  type: 'website' | 'telegram' | 'jetton';
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
