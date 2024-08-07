import { AssetKind } from "./stonFiApi";

export interface StonFiAsset {
  balance: string;
  blacklisted: boolean;
  community: boolean;
  contract_address: string;
  decimals: number;
  default_symbol: boolean;
  deprecated: boolean;
  dex_price_usd: string;
  dex_usd_price: string;
  display_name: string;
  image_url: string;
  kind: AssetKind;
  priority: number;
  symbol: string;
  tags: string[];
  taxable: boolean;
  third_party_price_usd: string;
  third_party_usd_price: string;
  wallet_address: string;
}

export interface GetStonFiAssetDTO {
  asset: StonFiAsset;
}
