import type { PayloadAction} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AssetInfo } from "@ston-fi/api";

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
