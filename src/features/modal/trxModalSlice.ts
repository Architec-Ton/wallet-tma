import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialConfirmationModalState } from "../../types/modal";

const trxModalSlice = createSlice({
  name: "trxModal",
  initialState: initialConfirmationModalState,
  reducers: {
    open: (state) => {
      state.isOpened = true;
      state.isDeclined = false;
      state.isConfirmed = false;
    },
    confirm: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload;
      state.isConfirmed = true;
      state.isOpened = false;
    },
    decline: (state) => {
      state.isDeclined = true;
      state.isOpened = false;
    },
  },
});

export const trxModalActions = trxModalSlice.actions;

export default trxModalSlice.reducer;
