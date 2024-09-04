import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "./assest";

export interface HistoryOrderDto {
  type: MarketModeEnum;
  createdAt: string;
  status: string;
  fromValue: number;
  toValue: number;
  uuid: string;
  userName?: string;
  stats?: string;
  fromAsset: CoinDto;
  toAsset: CoinDto;
}

export interface MarketOrdersDto {
  items: HistoryOrderDto[];
  page: number;
  pages: number;
  size: number;
  total: number;
}