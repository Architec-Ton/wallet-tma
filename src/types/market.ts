import { MarketModeEnum } from "features/market/marketSlice";
import { CoinDto } from "./assest";

export interface MarketOrderDto {
  type: MarketModeEnum;
  date: number;
  status: string;
  from_value: number;
  to_value: number;
  uid: string;
  userName?: string;
  stats?: string;
  assets: {
    from_asset: CoinDto;
    to_asset: CoinDto;
  }
}