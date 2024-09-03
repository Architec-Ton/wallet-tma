import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinDto } from "types/assest";

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
    }
  }
})

export const {
  setMarketMode,
  setOrderPrimaryAsset,
  setOrderSecondaryAsset,
  setOrderValues,
  clearOrderAssets,
} = marketSlice.actions

export default marketSlice.reducer