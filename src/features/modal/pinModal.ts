import { createAsyncThunk } from "@reduxjs/toolkit";
import { pinCodeModalActions } from "./pinModalSlice";
import { store } from "../../store";

const pinCodeModalThunkActions = {
  open: createAsyncThunk<string | undefined, void, {}>(
    "pinCodeModal",
    async (_, { dispatch }) => {
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
    }
  ),
};

export default pinCodeModalThunkActions;
