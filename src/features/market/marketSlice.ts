import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CoinDto } from "types/assest";
import { MarketOrderDto } from "types/market";

export enum MarketModeEnum {
  SELL = "sell",
  BUY = "buy",
}

interface MarketState {
  mode: MarketModeEnum;
  fromAsset?: CoinDto;
  toAsset?: CoinDto;
  fromValue?: number;
  toValue?: number;
  orders?: MarketOrderDto[];
  assets?: CoinDto[];
  walletAssets?: CoinDto[];
}

const initialState: MarketState = {
  mode: MarketModeEnum.BUY,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setMarketMode(state: MarketState, action: PayloadAction<MarketModeEnum>) {
      state.mode = action.payload;
    },
    setOrderPrimaryAsset(state: MarketState, action: PayloadAction<CoinDto>) {
      state.fromAsset = action.payload;
    },
    setOrderSecondaryAsset(state: MarketState, action: PayloadAction<CoinDto>) {
      state.toAsset = action.payload;
    },
    setOrderValues(state: MarketState, action: PayloadAction<{ fromValue: number; toValue: number }>) {
      state.fromValue = action.payload.fromValue;
      state.toValue = action.payload.toValue;
    },
    clearOrderAssets(state: MarketState) {
      state.fromAsset = undefined;
      state.toAsset = undefined;
      state.fromValue = undefined;
      state.toValue = undefined;
    },
    setOrders(state: MarketState, action: PayloadAction<MarketOrderDto[] | undefined>) {
      state.orders = state.orders && action.payload ? [...state.orders, ...action.payload] : action.payload;
    },
    setAssets(state: MarketState, action: PayloadAction<CoinDto[]>) {
      state.assets = action.payload;
    },
    setWalletAssets(state: MarketState, action: PayloadAction<CoinDto[]>) {
      state.walletAssets = action.payload;
    },
  },
});

export const {
  setMarketMode,
  setOrderPrimaryAsset,
  setOrderSecondaryAsset,
  setOrderValues,
  clearOrderAssets,
  setOrders,
  setAssets,
  setWalletAssets,
} = marketSlice.actions;

export default marketSlice.reducer;
