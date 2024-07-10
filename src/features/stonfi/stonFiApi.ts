import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinDto } from "../../types/assest";

export const AssetKind = {
  Ton: "ton",
  Wton: "wton",
  Jetton: "jetton",
} as const;

export type AssetKind = keyof typeof AssetKind;

export type AssetInfo = {
  balance?: string | null;
  blacklisted: boolean;
  community: boolean;
  contract_address: string;
  decimals: number;
  default_symbol: boolean;
  deprecated: boolean;
  dex_price_usd?: string | null;
  dex_usd_price?: string | null;
  display_name?: string | null;
  image_url?: string | null;
  kind: AssetKind;
  priority: number;
  symbol: string;
  third_party_price_usd?: string | null;
  wallet_address?: string | null;
};

export const stonFiApi = createApi({
  reducerPath: "stonFiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.ston.fi/v1"
  }),
  endpoints: (builder) => ({
    getStonfiAssets: builder.query<CoinDto[], unknown>({
      query: () => `assets`,
      transformResponse: (response: { asset_list: AssetInfo[]}) => {
        const assets = response.asset_list.filter(asset => asset.default_symbol === true && !asset.blacklisted)
        // return assets
        const transformedAssets: CoinDto[] = []
        assets.reduce((acc, asset: AssetInfo): CoinDto[] => {
          acc.push({
            type: AssetKind[asset.kind],
            amount: 0,
            usdPrice: Number(asset.dex_usd_price),
            changePrice: 0,
            meta: {
              name: asset.display_name as string,
              description: asset.display_name as string,
              address: asset.contract_address,
              image: asset.image_url as string,
              decimals: asset.decimals,
              symbol: asset.symbol
            }
          })
          return acc
        }, transformedAssets as CoinDto[])
        return transformedAssets as CoinDto[]
      }
    }),
  }),
});

export const { useGetStonfiAssetsQuery } = stonFiApi;
