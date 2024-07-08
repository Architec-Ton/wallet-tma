import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface WalletState {
  tonUsdPrice: number;
}

const initialState: WalletState = {
  tonUsdPrice: 0,
} satisfies WalletState;

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setTonUsdPrice(state: WalletState, action: PayloadAction<number>) {
      state.tonUsdPrice = action.payload;
    },
  },
});

export const { setTonUsdPrice } = walletSlice.actions;

export default walletSlice.reducer;
