import { createAsyncThunk } from "@reduxjs/toolkit";
import { GameListItemType, GameListType } from "../../types/gameTypes";

export const fetchGames = createAsyncThunk<GameListType<GameListItemType[]>, undefined, { rejectValue: string | unknown }>(
    'gaming/fetchGames',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://my-json-server.typicode.com/vardanter/architec_games/categories")

            if (!response.ok) {
                throw new Error("Server error!!!")
            }

            const games = await response.json()
            return games
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)