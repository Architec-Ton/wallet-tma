import type { Address } from "@ton/core";
import type { MarketModeEnum } from "features/market/marketSlice";

import type { CoinDto } from "./assest";

export enum OrderStatus {
  ACTIVE = "active",
  FINISHED = "finished",
  CANCELED = "canceled",
}

export type CreateOrderAsset = {
  type: string;
  address: string;
};

export interface MarketOrderDto {
  type: MarketModeEnum;
  createdAt: string;
  status: OrderStatus;
  fromValue: number;
  toValue: number;
  uuid: string;
  userUsername?: string;
  userTotalOrders: number;
  fromAsset: CoinDto;
  toAsset: CoinDto;
}

export interface MarketOrdersDto {
  items: MarketOrderDto[];
  page: number;
  pages: number;
  size: number;
  total: number;
}

export interface CreateOrderRequestQuery {
  type?: MarketModeEnum;
  fromAsset: CreateOrderAsset;
  toAsset: CreateOrderAsset;
  fromValue: number;
  toValue: number;
}

export interface CreateOrderDto {
  type: MarketModeEnum;
  createdAt: string;
  status: OrderStatus;
  fromValue: number;
  toValue: number;
  uuid: string;
  fromAsset: CoinDto;
  toAsset: CoinDto;
  rawTxn: OrderTxParams;
}

export interface OrderTxParams {
  to: Address;
  body: string;
  value: bigint;
  mode: number;
  bodyHash: string;
}
