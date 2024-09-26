import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CoinDto } from "types/assest";
import {
  CreateOrderDto,
  CreateOrderRequestQuery,
  MarketOrderDto,
  MarketOrdersDto,
  MarketOrdersRequestQuery,
  OrderStatus,
  OrderTxParams,
} from "types/market";

import { P2P_BE_URL } from "../../constants";
import { RootState } from "../../store";
import { MarketModeEnum } from "./marketSlice";

interface MyOrdersRequestQuery {
  status: "active" | "history";
  page?: number;
  size?: number;
}

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
    getOrders: builder.query<MarketOrdersDto, MarketOrdersRequestQuery>({
      query: ({ page, size }) => ({
        url: `orders/all`,
        params: { page, size },
      }),
      transformResponse: (response: MarketOrdersDto, meta, { mode }) => {
        let transformedOrders: MarketOrderDto[] = [];
        if (mode === MarketModeEnum.SELL) {
          response.items.reduce((acc, currentOrder: MarketOrderDto) => {
            acc.push({
              ...currentOrder,
              fromAsset: currentOrder.toAsset,
              toAsset: currentOrder.fromAsset,
              fromValue: currentOrder.toValue,
              toValue: currentOrder.fromValue,
            });
            return acc;
          }, transformedOrders);
        } else {
          transformedOrders = response.items;
        }
        return { ...response, items: transformedOrders };
      },
    }),
    getAssets: builder.query<{ assets: CoinDto[]; nft: any }, undefined>({
      query: () => ({
        url: `assets`,
      }),
    }),
    getOrdersHistory: builder.query<MarketOrdersDto, MyOrdersRequestQuery>({
      query: ({ status, page, size }) => ({
        url: `orders`,
        params: { status, page, size },
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
