import { RootState } from "../../store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuth = (state: RootState) => state.auth.auth;
