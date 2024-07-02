import { RootState } from "../../store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAuthIsTmaReady = (state: RootState) => state.auth.isTmaReady;
export const selectAuthIsTonReady = (state: RootState) => state.auth.isTonReady;
export const selectAuthIsReady = (state: RootState) => state.auth.isReady;
