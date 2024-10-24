import { configureStore } from "@reduxjs/toolkit";

import { marketApi } from "features/market/marketApi";
import marketSlice from "features/market/marketSlice";
import popupSlice from "features/tma/popupSlice";

import alertReducer from "../features/alert/alertSlice";
import { authApi } from "../features/auth/authApi";
import authSlice from "../features/auth/authSlice";
import { bankApi } from "../features/bank/bankApi";
import { gamingApi } from "../features/gaming/gamingApi";
import gamingSlice from "../features/gaming/gamingSlice";
import pinCodeModalReducer from "../features/modal/pinModalSlice";
import { trxApi } from "../features/modal/trxModalApi";
import trxModalReducer from "../features/modal/trxModalSlice";
import pageReducer from "../features/page/pageSlice";
import { stonFiApi } from "../features/stonfi/stonFiApi";
import swapSlice from "../features/swap/swapSlice";
import backButtonReducer from "../features/tma/backButtonSlice";
import mainButtonReducer from "../features/tma/mainButtonSlice";
import tmaReducer from "../features/tma/tmaSlice";
import tonReducer from "../features/ton/tonSlice";
import { walletApi } from "../features/wallet/walletApi";
import walletSlice from "../features/wallet/walletSlice";
import ratingSlice from "features/rating/ratingSlice.ts";

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
    market: marketSlice,
    popup: popupSlice,
    rating: ratingSlice,
    [trxApi.reducerPath]: trxApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [gamingApi.reducerPath]: gamingApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [stonFiApi.reducerPath]: stonFiApi.reducer,
    [marketApi.reducerPath]: marketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bankApi.middleware,
      trxApi.middleware,
      walletApi.middleware,
      gamingApi.middleware,
      stonFiApi.middleware,
      marketApi.middleware,
    ),
});

export const storeDispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
