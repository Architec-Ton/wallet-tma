import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../../store";
import { trxModalActions } from "./trxModalSlice";

const trxModalThunkActions = {
  open: createAsyncThunk<string | undefined, void, {}>(
    "trxModal",
    async (_, { dispatch }) => {
      dispatch(trxModalActions.open());

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
    }
  ),
};

export default trxModalThunkActions;
