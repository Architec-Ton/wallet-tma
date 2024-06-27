import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackButtonState {
  isVisible: boolean;
}

const initialState: BackButtonState = {
  isVisible: false,
};

const backButtonSlice = createSlice({
  name: "btn",
  initialState,
  reducers: {
    setBackButtonVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
});

export const { setBackButtonVisible } = backButtonSlice.actions;

export default backButtonSlice.reducer;
