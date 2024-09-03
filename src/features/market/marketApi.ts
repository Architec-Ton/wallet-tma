import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MarketOrdersDto } from "types/market";
import { CoinDto } from "types/assest";
import { P2P_BE_URL } from "../../constants";
import { RootState } from "../../store";

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: P2P_BE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<MarketOrdersDto, unknown>({
      query: () => `orders`,
    }),
    getAssets: builder.query<CoinDto[], undefined>({
      query: () => ({
        url: `assets`,
      }),
    }),
    getOrdersHistory: builder.query<MarketOrdersDto, undefined>({
      query: () => ({
        url: `orders/my-orders`,
      }),
    }),
    createOrder: builder.mutation<any, any>({
      query: ({ type, fromAsset, toAsset, fromValue, toValue }: any) => ({
        url: "orders",
        body: { type, fromAsset, toAsset, fromValue, toValue },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetAssetsQuery,
  useLazyGetOrdersQuery,
  useLazyGetOrdersHistoryQuery,
  useCreateOrderMutation,
} = marketApi;
