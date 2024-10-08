import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface TmaState {
  isTma: boolean;
  isTmaLoading: boolean;
  referral?: string;
  initDataRaw?: string;
}

const initialState: TmaState = {
  isTma: false,
  isTmaLoading: true,
};

const tmaSlice = createSlice({
  name: "tma",
  initialState,
  reducers: {
    setTmaLoading(state, action: PayloadAction<boolean>) {
      state.isTmaLoading = action.payload;
    },
    setTma(state, action: PayloadAction<boolean>) {
      state.isTma = action.payload;
    },
    setTmaInitDataRaw(state, action: PayloadAction<string>) {
      state.initDataRaw = action.payload;
    },
    setReferral(state, action: PayloadAction<string | undefined>) {
      state.referral = action.payload;
    },
  },
});

export const { setTma, setTmaLoading, setReferral, setTmaInitDataRaw } = tmaSlice.actions;

export default tmaSlice.reducer;
