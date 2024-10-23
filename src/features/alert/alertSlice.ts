import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AlertState {
  isVisible: boolean;
  message: string;
  duration: number;
  isWarning: boolean;
}

const initialState: AlertState = {
  isVisible: false,
  message: "",
  duration: 0,
  isWarning: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; duration: number }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
    },
    showWarningAlert: (state, action: PayloadAction<{ message: string; duration: number }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
      state.isWarning = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.message = "";
      state.duration = 0;
      state.isWarning = false;
    },
  },
});

export const { showAlert, hideAlert, showWarningAlert } = alertSlice.actions;

export default alertSlice.reducer;
