import { createAsyncThunk } from "@reduxjs/toolkit";

import { store } from "../../store";
import { pinCodeModalActions } from "./pinModalSlice";

const pinCodeModalThunkActions = {
  open: createAsyncThunk<string | undefined, void, {}>("pinCodeModal", async (_, { dispatch }) => {
    dispatch(pinCodeModalActions.open());

    return new Promise<string | undefined>((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        if (state.pincode.isConfirmed) {
          unsubscribe();
          resolve(state.pincode.value);
        }
        if (state.pincode.isDeclined) {
          unsubscribe();
          resolve(undefined);
        }
      });
    });
  }),
};

export default pinCodeModalThunkActions;
