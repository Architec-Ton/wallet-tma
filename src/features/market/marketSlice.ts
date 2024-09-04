import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinDto } from "types/assest";
import { HistoryOrderDto } from "types/market";

export enum MarketModeEnum {
  SELL="sell",
  BUY="buy",
}

interface MarketState {
  mode: MarketModeEnum
  fromAsset?: CoinDto
  toAsset?: CoinDto
  fromValue?: number
  toValue?: number
  orders?: HistoryOrderDto[]
}

const initialState: MarketState = {
  mode: MarketModeEnum.BUY,
}

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setMarketMode(state: MarketState, action: PayloadAction<MarketModeEnum>) {
      state.mode = action.payload
    },
    setOrderPrimaryAsset(state: MarketState, action: PayloadAction<CoinDto>) {
      state.fromAsset = action.payload
    },
    setOrderSecondaryAsset(state: MarketState, action: PayloadAction<CoinDto>) {
      state.toAsset = action.payload
    },
    setOrderValues(state: MarketState, action: PayloadAction<{fromValue: number, toValue: number}>) {
      state.fromValue = action.payload.fromValue
      state.toValue = action.payload.toValue
    },
    clearOrderAssets(state: MarketState) {
      state.fromAsset = undefined
      state.toAsset = undefined
    },
    setOrders(state: MarketState, action: PayloadAction<HistoryOrderDto[] | undefined>) {
      state.orders = action.payload
    }
  }
})

export const {
  setMarketMode,
  setOrderPrimaryAsset,
  setOrderSecondaryAsset,
  setOrderValues,
  clearOrderAssets,
  setOrders,
} = marketSlice.actions

export default marketSlice.reducer