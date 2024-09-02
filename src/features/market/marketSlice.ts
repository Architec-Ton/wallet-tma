import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinDto } from "types/assest";

export enum MarketModeEnum {
  SELL="sell",
  BUY="buy",
}

interface MarketState {
  mode: MarketModeEnum
  from_asset?: CoinDto
  to_asset?: CoinDto
  from_value?: number
  to_value?: number
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
      state.from_asset = action.payload
    },
    setOrderSecondaryAsset(state: MarketState, action: PayloadAction<CoinDto>) {
      state.to_asset = action.payload
    },
    setOrderValues(state: MarketState, action: PayloadAction<{from_value: number, to_value: number}>) {
      state.from_value = action.payload.from_value
      state.to_value = action.payload.to_value
    },
    clearOrderAssets(state: MarketState) {
      state.from_asset = undefined
      state.to_asset = undefined
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