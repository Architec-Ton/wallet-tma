import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: PageState = {
  title: {},
  isLoading: true,
  isLibraryInitialized: false,
  isApiLoading: true,
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
  },
});

export const { setTitle, setLoading, setLibraryInitialized, setApiLoading } =
  pageSlice.actions;

export default pageSlice.reducer;
