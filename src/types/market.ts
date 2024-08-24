import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "./assest";

export interface MarketOrderDto {
  type: MarketModeEnum;
  date: number;
  status: string;
  primaryValue: number;
  secondaryValue: number;
  assets: {
    primaryAsset: CoinDto;
    secondaryAsset: CoinDto;
  }
}