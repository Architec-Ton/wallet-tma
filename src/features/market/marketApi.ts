import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../api/api";
import { MarketOrderDto } from "types/market";
import { CoinDto } from "types/assest";

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery,
  endpoints: (builder) => ({
    getOrders: builder.query<MarketOrderDto[], unknown>({
      query: () => `orders`,
    }),
    getAssets: builder.query<CoinDto[], undefined>({
      query: () => ({
        url: `assets`,
      }),
    }),
    getOrdersHistory: builder.query<MarketOrderDto[], undefined>({
      query: () => ({
        url: `orders/history`,
      }),
    }),
    createOrder: builder.mutation<any, any>({
      query: ({ offer_address, ask_address, units, slippage_tolerance }: any) => ({
        url: "order",
        params: { offer_address, ask_address, units, slippage_tolerance },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetAssetsQuery,
  useLazyGetOrdersQuery,
  useGetOrdersHistoryQuery,
  useCreateOrderMutation,
} = marketApi;
