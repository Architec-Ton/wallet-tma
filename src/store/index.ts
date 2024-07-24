import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/pageSlice";
import tonReducer from "../features/ton/tonSlice";
import mainButtonReducer from "../features/tma/mainButtonSlice";
import backButtonReducer from "../features/tma/backButtonSlice";
import tmaReducer from "../features/tma/tmaSlice";
import gamingSlice from "../features/gaming/gamingSlice";
import { gamingApi } from "../features/gaming/gamingApi";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { walletApi } from "../features/wallet/walletApi";
import swapSlice from "../features/swap/swapSlice";
import { bankApi } from "../features/bank/bankApi";
import walletSlice from "../features/wallet/walletSlice";
import { stonFiApi } from "../features/stonfi/stonFiApi";
import alertReducer from "../features/alert/alertSlice.ts";
import pinCodeModalReducer from "../features/modal/pinModalSlice.ts";
import trxModalReducer from "../features/modal/trxModalSlice.ts";
import { trxApi } from "../features/modal/trxModalApi.ts";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    btn: mainButtonReducer,
    backBtn: backButtonReducer,
    tma: tmaReducer,
    ton: tonReducer,
    gaming: gamingSlice,
    auth: authSlice,
    swap: swapSlice,
    wallet: walletSlice,
    alert: alertReducer,
    pincode: pinCodeModalReducer,
    trx: trxModalReducer,
    [trxApi.reducerPath]: trxApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [gamingApi.reducerPath]: gamingApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [stonFiApi.reducerPath]: stonFiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bankApi.middleware,
      trxApi.middleware,
      walletApi.middleware,
      gamingApi.middleware,
      stonFiApi.middleware
    ),
});

export const storeDispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
