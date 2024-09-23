import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface BackButtonState {
  isVisible: boolean;
  isAppWasReloaded: boolean;
}

const initialState: BackButtonState = {
  isVisible: false,
  isAppWasReloaded: false,
};

const backButtonSlice = createSlice({
  name: "btn",
  initialState,
  reducers: {
    setBackButtonVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setIsAppWasReloaded(state, action: PayloadAction<boolean>) {
      state.isAppWasReloaded = action.payload;
    },
  },
});

export const { setBackButtonVisible, setIsAppWasReloaded } = backButtonSlice.actions;

export default backButtonSlice.reducer;
