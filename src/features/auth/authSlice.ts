import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthInitData } from "../../types/auth";
import { UserInfo } from "../../types/user";
import { AuthInitTon } from "../../types/wallet";

export interface AccountState {
  account?: AuthInitData;
  wallet?: AuthInitTon;
}

export interface AuthState {
  accessToken?: string;
  isTmaReady: boolean;
  isTonReady: boolean;
  isReady: boolean;
  auth?: AccountState;
}

const initialState: AuthState = {
  isTmaReady: false,
  isTonReady: false,
  isReady: false,
} satisfies AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(
      state: AuthState,
      action: PayloadAction<string | undefined>
    ) {
      state.accessToken = action.payload;
      state.isReady =
        state.isTmaReady && state.isTonReady && !!state.accessToken;
    },
    clearAccessToken(state: AuthState) {
      state.accessToken = undefined;
    },
    setUser(state: AuthState, action: PayloadAction<UserInfo | undefined>) {
      state.auth = {
        ...state.auth,
        account: {
          ...state.auth?.account,
          user: action.payload,
        } as AuthInitData,
      };
    },
    setAccount(
      state: AuthState,
      action: PayloadAction<AuthInitData | undefined>
    ) {
      state.auth = { ...state.auth, account: action.payload };
    },
    setIsTmaReady(state: AuthState, action: PayloadAction<boolean>) {
      state.isTmaReady = action.payload;
      state.isReady =
        state.isTmaReady && state.isTonReady && !!state.accessToken;
    },
    setIsTonReady(state: AuthState, action: PayloadAction<boolean>) {
      state.isTonReady = action.payload;
      state.isReady =
        state.isTmaReady && state.isTonReady && !!state.accessToken;
    },
  },
});

export const {
  setAccessToken,
  clearAccessToken,
  setUser,
  setAccount,
  setIsTmaReady,
  setIsTonReady,
} = authSlice.actions;

export default authSlice.reducer;
