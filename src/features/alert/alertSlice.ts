import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    isVisible: boolean;
    message: string;
    duration: number;
}

const initialState: AlertState = {
    isVisible: false,
    message: '',
    duration: 0,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ message: string, duration: number }>) => {
            state.isVisible = true;
            state.message = action.payload.message;
            state.duration = action.payload.duration;
        },
        hideAlert: (state) => {
            state.isVisible = false;
            state.message = '';
            state.duration = 0;
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;