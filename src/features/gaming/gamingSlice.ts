import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppsList, GameFilterType } from '../../types/gameTypes';

export interface GamingState {
  games: AppsList;
  filter: GameFilterType;
}

const initialFilter: GameFilterType = {
  name: false,
  rate: false,
  date: false,
  direction: undefined,
};

const initialState: GamingState = {
  games: { categories: [], marketings: [] },
  filter: initialFilter,
} satisfies GamingState;

const gamingSlice = createSlice({
  name: 'gaming',
  initialState,
  reducers: {
    setCategories(state: GamingState, action: PayloadAction<AppsList>) {
      state.games = action.payload;
    },
    setFilter(state: GamingState, action: PayloadAction<GameFilterType>) {
      state.filter = action.payload;
    },
    clearFilter(state: GamingState) {
      state.filter = initialFilter;
    },
  },
});

export const { setCategories, setFilter, clearFilter } = gamingSlice.actions;

export default gamingSlice.reducer;
