import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateOrderDto, CreateOrderRequestQuery, MarketOrdersDto, OrderTxParams } from "types/market";
import { CoinDto } from "types/assest";
import { P2P_BE_URL } from "../../constants";
import { RootState } from "../../store";
import { MarketModeEnum } from "./marketSlice";

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
    getOrders: builder.query<MarketOrdersDto, MarketModeEnum>({
      query: (mode) => ({
        url: `orders/all`,
        params: {order_type: mode}
      }),
    }),
    getAssets: builder.query<{assets: CoinDto[], nft: any}, undefined>({
      query: () => ({
        url: `assets`,
      }),
    }),
    getOrdersHistory: builder.query<MarketOrdersDto, undefined>({
      query: () => ({
        url: `orders`,
      }),
    }),
    createOrder: builder.mutation<CreateOrderDto, CreateOrderRequestQuery>({
      query: ({ type, fromAsset, toAsset, fromValue, toValue }: CreateOrderRequestQuery) => ({
        url: "order",
        body: { type, fromAsset, toAsset, fromValue, toValue },
        method: "POST",
      }),
    }),
    cancelOrder: builder.query<OrderTxParams, {uuid: string}>({
      query: ({ uuid }) => ({
        url: `order/${uuid}/cancel`,
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
  useLazyCancelOrderQuery,
} = marketApi;
