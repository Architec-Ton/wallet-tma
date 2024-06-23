import { RootState } from "../../store";

export const selectGames = (state: RootState) => state.gaming.games
export const selectGamesStatus = (state: RootState) => state.gaming.status