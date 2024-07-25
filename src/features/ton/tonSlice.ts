import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TonConnectionMode {
  disconnect = 0,
  tonconnect,
  mnemonics,
}

interface TonState {
  address?: string;
  publicKey?: string;
  privateKey?: string;
  mode: TonConnectionMode;
  isTonLoading: boolean;
  seqno: number | null;
  expiration: number | null;
}

interface TonAddressProp {
  address?: string;
  publicKey?: string;
  privateKey?: string;
  mode: TonConnectionMode;
}

const initialState: TonState = {
  isTonLoading: true,
  seqno: null,
  expiration: null,
  mode: TonConnectionMode.disconnect,
};

const tonSlice = createSlice({
  name: "ton",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<TonAddressProp>) {
      state.address = action.payload.address;
      state.publicKey = action.payload.publicKey;
      state.privateKey = action.payload.privateKey;
      state.mode = action.payload.mode;
      if (action.payload.mode == TonConnectionMode.disconnect) {
        state.address = undefined;
        state.publicKey = undefined;
      }
      state.isTonLoading = false;
      state.expiration = null;
      state.seqno = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isTonLoading = action.payload;
    },
    setSeqno(state, action: PayloadAction<number | null>) {
      state.seqno = action.payload;
    },
    setExpiration(state) {
      state.expiration = new Date(new Date().getTime() + 30000).getTime();
    },
  },
});

export const { setAddress, setLoading, setSeqno, setExpiration } =
  tonSlice.actions;

export default tonSlice.reducer;
