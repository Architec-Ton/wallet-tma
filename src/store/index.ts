import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/page/pageSlice';
import mainButtonReducer from '../features/tma/mainButtonSlice';
import tmaReducer from '../features/tma/tmaSlice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    btn: mainButtonReducer,
    tma: tmaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
