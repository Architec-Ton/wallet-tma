import { RootState } from "../../store";

export const selectGames = (state: RootState) => state.gaming.games
export const selectGamesFilter = (state: RootState) => state.gaming.filter