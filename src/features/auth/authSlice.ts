import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/user";
import { AuthInitData } from "../../types/auth";
import { AuthInitTon } from "../../types/wallet";

export interface AccountState {
  account?: AuthInitData;
  wallet?: AuthInitTon;
}

export interface AuthState {
  accessToken?: string;
  auth?: AccountState;
}

const initialState: AuthState = {} satisfies AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(
      state: AuthState,
      action: PayloadAction<string | undefined>
    ) {
      state.accessToken = action.payload;
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
  },
});

export const { setAccessToken, clearAccessToken, setUser, setAccount } =
  authSlice.actions;

export default authSlice.reducer;
