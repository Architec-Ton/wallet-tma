import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialConfirmationModalState,
  trxModalState,
} from "../../types/modal";
import { TransactionModalInit } from "../../types/transaction";

const trxModalSlice = createSlice({
  name: "trxModal",
  initialState: initialConfirmationModalState as trxModalState,
  reducers: {
    open: (
      state: trxModalState,
      action: PayloadAction<TransactionModalInit | undefined>
    ) => {
      state.isOpened = true;
      state.isDeclined = false;
      state.isConfirmed = false;
      if (action.payload) state.trxHash = action.payload.trxHash;
      if (action.payload) state.trxInitData = action.payload.trxInitData;
    },
    confirm: (
      state: trxModalState,
      action: PayloadAction<string | undefined>
    ) => {
      state.value = action.payload;
      state.isConfirmed = true;
      state.isOpened = false;
    },
    decline: (state: trxModalState) => {
      state.isDeclined = true;
      state.isOpened = false;
    },
  },
});

export const trxModalActions = trxModalSlice.actions;

export default trxModalSlice.reducer;
