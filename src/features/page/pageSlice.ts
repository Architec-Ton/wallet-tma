import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PageTitleState {
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
}

interface PageState {
  title: PageTitleState;
  isLoading: boolean;
  isLibraryInitialized: boolean;
  isApiLoading: boolean;
  isNavbarVisible: boolean;
  isContinueButtonClicked: boolean;
}

const initialState: PageState = {
  title: {},
  isLoading: true,
  isLibraryInitialized: false,
  isApiLoading: true,
  isNavbarVisible: false,
  isContinueButtonClicked: false,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<PageTitleState>) {
      state.title = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setLibraryInitialized(state, action: PayloadAction<boolean>) {
      state.isLibraryInitialized = action.payload;
    },
    setApiLoading(state, action: PayloadAction<boolean>) {
      state.isApiLoading = action.payload;
    },
    setNavbarVisible(state, action: PayloadAction<boolean>) {
      state.isNavbarVisible = action.payload;
    },
    setIsContinueButtonClicked(state, action: PayloadAction<boolean>) {
      state.isContinueButtonClicked = action.payload;
    },
  },
});

export const {
  setTitle,
  setLoading,
  setLibraryInitialized,
  setApiLoading,
  setNavbarVisible,
  setIsContinueButtonClicked,
} = pageSlice.actions;

export default pageSlice.reducer;
