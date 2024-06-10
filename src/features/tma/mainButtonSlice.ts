import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainButtonState {
  title: string;
  isLoading: boolean;
  isLibraryInitialized: boolean;
  isApiLoading: boolean;
}

const initialState: MainButtonState = {
  title: 'Default Title',
  isLoading: false,
  isLibraryInitialized: false,
  isApiLoading: false,
};

const mainButtonSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
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
  mainButtonSlice.actions;

export default mainButtonSlice.reducer;
