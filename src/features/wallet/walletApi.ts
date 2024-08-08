// authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";

import type { CoinDto } from "../../types/assest";
import type { TransactionHistoryItemDto } from "../../types/history";
import type { WalletInfoData } from "../../types/wallet";
import baseQuery from "../api/api";
import { setTonUsdPrice } from "./walletSlice";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery,
  endpoints: (builder) => ({
    apiWalletInfo: builder.mutation<WalletInfoData, null>({
      query: () => ({
        url: "/info",
        method: "GET",
      }),
      async onCacheEntryAdded(_, { dispatch, cacheDataLoaded }) {
        const cacheData = await cacheDataLoaded;
        if (cacheData) {
          const { currentWallet, wallets } = cacheData.data;
          const { assets } = wallets[currentWallet];
          const ton = assets.find((asset) => asset.meta?.symbol === "TON");
          if (ton) {
            const tonUsdPrice = ton.usdPrice / ton.amount;
            dispatch(setTonUsdPrice(tonUsdPrice));
          }
        }
      },
    }),
    apiWalletAssets: builder.mutation<CoinDto[], null>({
      query: () => ({
        url: "/assets",
        method: "GET",
      }),
    }),
    apiWalletHistory: builder.mutation<TransactionHistoryItemDto[], null>({
      query: () => ({
        url: "/history",
        method: "GET",
      }),
    }),
  }),
});

export const { useApiWalletInfoMutation, useApiWalletAssetsMutation, useApiWalletHistoryMutation } = walletApi;
