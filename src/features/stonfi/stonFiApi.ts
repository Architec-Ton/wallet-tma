import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Address } from "@ton/core";

import { CoinDto } from "../../types/assest";
import { GetStonFiAssetDTO } from "./types";

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

export type SimulateRequestQuery = {
  offer_address: string;
  ask_address: string;
  units: string | number;
  slippage_tolerance: string;
};

export type SimulateDTO = {
  offer_address: string;
  ask_address: string;
  offer_jetton_wallet: string;
  ask_jetton_wallet: string;
  router_address: string;
  pool_address: string;
  offer_units: string;
  ask_units: string;
  slippage_tolerance: string;
  min_ask_units: string;
  swap_rate: string;
  price_impact: string;
  fee_address: string;
  fee_units: string;
  fee_percent: string;
};

export const stonFiApi = createApi({
  reducerPath: "stonFiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.ston.fi/v1",
  }),
  endpoints: (builder) => ({
    getStonfiAssets: builder.query<CoinDto[], unknown>({
      query: () => `assets`,
      transformResponse: (response: { asset_list: AssetInfo[] }) => {
        const assets = response.asset_list.filter((asset) => asset.default_symbol === true && !asset.blacklisted);
        // return assets
        const transformedAssets: CoinDto[] = [];
        assets.reduce((acc, asset: AssetInfo): CoinDto[] => {
          acc.push({
            type: AssetKind[asset.kind],
            amount: 0,
            usdPrice: Number(asset.dex_usd_price) || 0,
            changePrice: 0,
            meta: {
              name: asset.display_name as string,
              description: asset.display_name as string,
              address: asset.contract_address,
              image: asset.image_url as string,
              decimals: asset.decimals,
              symbol: asset.symbol,
            },
          });
          return acc;
        }, transformedAssets as CoinDto[]);
        return transformedAssets as CoinDto[];
      },
    }),

    getStonFiAsset: builder.query<GetStonFiAssetDTO, string | undefined>({
      query: (addr?: string) => ({
        url: `assets/${addr}`,
        keepUnusedDataFor: 300, // 5min
      }),
    }),
    simulate: builder.query<SimulateDTO, SimulateRequestQuery>({
      query: ({ offer_address, ask_address, units, slippage_tolerance }: SimulateRequestQuery) => ({
        url: "swap/simulate",
        params: { offer_address, ask_address, units, slippage_tolerance },
        method: "POST",
      }),
    }),
    reverseSimulate: builder.query<SimulateDTO, SimulateRequestQuery>({
      query: ({ offer_address, ask_address, units, slippage_tolerance }: SimulateRequestQuery) => ({
        url: "reverse_swap/simulate",
        params: { offer_address, ask_address, units, slippage_tolerance },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetStonfiAssetsQuery,
  useGetStonFiAssetQuery,
  useLazyGetStonFiAssetQuery,
  useLazySimulateQuery,
  useLazyReverseSimulateQuery,
} = stonFiApi;
