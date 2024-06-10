import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/page/pageSlice';
import mainButtonReducer from '../features/tma/mainButtonSlice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    mainButton: mainButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
