import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenPopupOptions } from "@tma.js/sdk-react";

interface PopupState {
  isVisible: boolean;
  initData?: OpenPopupOptions;
}

const initialState: PopupState = {
  isVisible: false
}

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopupIsVisible: (state: PopupState, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload
    },
    setPopupInitData: (state: PopupState, action: PayloadAction<OpenPopupOptions>) => {
      state.initData = action.payload
    },
    resetPopupState: (state: PopupState) => {
      state.isVisible = false
      state.initData = undefined
    }
  }
})

export const { setPopupIsVisible, setPopupInitData, resetPopupState } = popupSlice.actions

export default popupSlice.reducer