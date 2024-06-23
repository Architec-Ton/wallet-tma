import { createSlice } from "@reduxjs/toolkit";
import { GameListItemType, GameListType } from "../../types/gameTypes";
import { fetchGames } from "./actions";

export interface GamingState {
  games: GameListType<GameListItemType[]>
  status: {
    isLoading: boolean
    isError: boolean
    error: string 
  }
}

const initialState: GamingState = {
  games: [],
  status: {
    isLoading: false,
    isError: false,
    error: ''
  }
} satisfies GamingState

const gamingSlice = createSlice({
  name: "gaming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state: GamingState) => {
      state.status.isLoading = true
    })
    builder.addCase(fetchGames.fulfilled, (state: GamingState, action) => {
      state.status.isLoading = false
      state.status.isError = false
      state.status.error = ''
      state.games = action.payload
    })
    builder.addCase(fetchGames.rejected, (state: GamingState, action) => {
      state.status.isLoading = false
      state.status.isError = true
      state.status.error = action.payload as string
    })
    
  }
})

export default gamingSlice.reducer