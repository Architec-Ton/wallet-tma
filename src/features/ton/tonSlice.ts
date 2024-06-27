import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TonConnectionMode {
  disconnect = 0,
  tonconnect,
  mnemonics,
}

interface TonState {
  address?: string;
  publicKey?: string;
  mode: TonConnectionMode;
  isTonLoading: boolean;
}

interface TonAddressProp {
  address?: string;
  publicKey?: string;
  mode: TonConnectionMode;
}

const initialState: TonState = {
  isTonLoading: true,
  mode: TonConnectionMode.disconnect,
};

const tonSlice = createSlice({
  name: "ton",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<TonAddressProp>) {
      state.address = action.payload.address;
      state.publicKey = action.payload.publicKey;
      state.mode = action.payload.mode;
      if (action.payload.mode == TonConnectionMode.disconnect) {
        state.address = undefined;
        state.publicKey = undefined;
      }
      state.isTonLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isTonLoading = action.payload;
    },
  },
});

export const { setAddress, setLoading } = tonSlice.actions;

export default tonSlice.reducer;
