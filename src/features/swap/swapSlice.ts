import type { PayloadAction} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AssetInfo {
  balance?: string | undefined;
  blacklisted: boolean;
  community: boolean;
  contractAddress: string;
  decimals: number;
  defaultSymbol: boolean;
  deprecated: boolean;
  dexPriceUsd?: string | undefined;
  displayName?: string | undefined;
  imageUrl?: string | undefined;
  kind: "Ton" | "Wton" | "Jetton";
  symbol: string;
  thirdPartyPriceUsd?: string | undefined;
  walletAddress?: string | undefined;
}

export interface SwapState {
  assets: AssetInfo[];
}

const initialState: SwapState = {
  assets: [],
} satisfies SwapState;

const swapSlice = createSlice({
  name: "gaming",
  initialState,
  reducers: {
    setAssets(state: SwapState, action: PayloadAction<AssetInfo[]>) {
      state.assets = action.payload;
    },
  },
});

export const { setAssets } = swapSlice.actions;

export default swapSlice.reducer;
