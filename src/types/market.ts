import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "./assest";

export interface MarketOrderDto {
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