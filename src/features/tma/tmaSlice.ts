import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TmaState {
  isTma: boolean;
  isTmaLoading: boolean;
  referral?: string;
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
    setReferral(state, action: PayloadAction<string | undefined>) {
      state.referral = action.payload;
    },
  },
});

export const { setTma, setTmaLoading, setReferral } = tmaSlice.actions;

export default tmaSlice.reducer;
