import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "./assest";

export interface MarketOrderDto {
  type: MarketModeEnum;
  date: number;
  status: string;
  primaryValue: number;
  secondaryValue: number;
  uid: string;
  userName?: string;
  stats?: string;
  assets: {
    primaryAsset: CoinDto;
    secondaryAsset: CoinDto;
  }
}