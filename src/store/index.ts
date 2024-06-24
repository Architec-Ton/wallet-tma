import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/pageSlice";
import tonReducer from "../features/ton/tonSlice";
import mainButtonReducer from "../features/tma/mainButtonSlice";
import tmaReducer from "../features/tma/tmaSlice";
import gamingSlice from "../features/gaming/gamingSlice";
import { gamingApi } from "../features/gaming/gamingApi";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    btn: mainButtonReducer,
    tma: tmaReducer,
    ton: tonReducer,
    gaming: gamingSlice,
    [gamingApi.reducerPath]: gamingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamingApi.middleware),
});

export const storeDispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
