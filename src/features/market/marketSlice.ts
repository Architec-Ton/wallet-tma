import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinDto } from "types/assest";

export enum MarketModeEnum {
  SELL="sell",
  BUY="buy",
}

interface MarketState {
  mode: MarketModeEnum
  primaryAsset?: CoinDto
  secondaryAsset?: CoinDto
  primaryValue?: number
  secondaryValue?: number
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
      state.primaryAsset = action.payload
    },
    setOrderSecondaryAsset(state: MarketState, action: PayloadAction<CoinDto>) {
      state.secondaryAsset = action.payload
    },
    setOrderValues(state: MarketState, action: PayloadAction<{primaryValue: number, secondaryValue: number}>) {
      state.primaryValue = action.payload.primaryValue
      state.secondaryValue = action.payload.secondaryValue
    },
  }
})

export const {
  setMarketMode,
  setOrderPrimaryAsset,
  setOrderSecondaryAsset,
  setOrderValues,
} = marketSlice.actions

export default marketSlice.reducer