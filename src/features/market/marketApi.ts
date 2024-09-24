import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CoinDto } from "types/assest";
import { CreateOrderDto, CreateOrderRequestQuery, MarketOrderDto, MarketOrdersDto, OrderStatus, OrderTxParams } from "types/market";

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
        // params: { order_type: mode },
      }),
      transformResponse: (response: MarketOrdersDto, meta, mode) => {
        let transformedOrders: MarketOrderDto[] = []
        if (mode === MarketModeEnum.BUY) {
          response.items.reduce((acc, currentOrder: MarketOrderDto) => {
            if (currentOrder.type === MarketModeEnum.SELL) {
              acc.push({
                ...currentOrder,
                fromAsset: currentOrder.toAsset,
                toAsset: currentOrder.fromAsset,
                fromValue: currentOrder.toValue,
                toValue: currentOrder.fromValue,
              })
            } else {
              acc.push(currentOrder)
            }
            return acc
          }, transformedOrders)
        } else {
          response.items.reduce((acc, currentOrder: MarketOrderDto) => {
            if (currentOrder.type === MarketModeEnum.BUY) {
              acc.push({
                ...currentOrder,
                fromAsset: currentOrder.toAsset,
                toAsset: currentOrder.fromAsset,
                fromValue: currentOrder.toValue,
                toValue: currentOrder.fromValue,
              })
            } else {
              acc.push(currentOrder)
            }
            return acc
          }, transformedOrders)
        }
        return response
        return { ...response, items: transformedOrders }
      }
    }),
    getAssets: builder.query<{ assets: CoinDto[]; nft: any }, undefined>({
      query: () => ({
        url: `assets`,
      }),
    }),
    getOrdersHistory: builder.query<MarketOrdersDto, "active" | "history">({
      query: (status=OrderStatus.ACTIVE) => ({
        url: `orders`,
        params: {status},
      }),
    }),
    createOrder: builder.mutation<CreateOrderDto, CreateOrderRequestQuery>({
      query: ({ type, fromAsset, toAsset, fromValue, toValue }: CreateOrderRequestQuery) => ({
        url: "order",
        body: { type, fromAsset, toAsset, fromValue, toValue },
        method: "POST",
      }),
    }),
    cancelOrder: builder.query<OrderTxParams, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `order/${uuid}/cancel`,
        method: "POST",
      }),
    }),
    executeOrder: builder.query<OrderTxParams, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `order/${uuid}/execute`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetAssetsQuery,
  useLazyGetOrdersQuery,
  useCreateOrderMutation,
  useLazyCancelOrderQuery,
  useLazyExecuteOrderQuery,
  useLazyGetOrdersHistoryQuery,
} = marketApi;
