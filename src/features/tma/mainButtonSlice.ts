import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainButtonState {
  title: string;
  isLoading: boolean;
  isVisible: boolean;
}

const initialState: MainButtonState = {
  title: 'Default Title',
  isLoading: false,
  isVisible: false,
};

const mainButtonSlice = createSlice({
  name: 'btn',
  initialState,
  reducers: {
    setMainButtonTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setMainButtonLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMainButtonVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
});

export const {
  setMainButtonTitle,
  setMainButtonLoading,
  setMainButtonVisible,
} = mainButtonSlice.actions;

export default mainButtonSlice.reducer;
