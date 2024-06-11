import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TmaState {
  isTma: boolean;
  isTmaLoading: boolean;
}

const initialState: TmaState = {
  isTma: false,
  isTmaLoading: true,
};

const tmaSlice = createSlice({
  name: 'tma',
  initialState,
  reducers: {
    setTmaLoading(state, action: PayloadAction<boolean>) {
      state.isTmaLoading = action.payload;
    },
    setTma(state, action: PayloadAction<boolean>) {
      state.isTma = action.payload;
    },
  },
});

export const { setTma, setTmaLoading } = tmaSlice.actions;

export default tmaSlice.reducer;
