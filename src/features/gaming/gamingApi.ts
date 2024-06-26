import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GameCategoryType,
  GameListItemType,
  GameListType,
  IGame,
  TGameLeader,
} from "../../types/gameTypes";
import { BE_URL } from "../../constants";
import { setCategories } from "./gamingSlice";

export const gamingApi = createApi({
  reducerPath: "gamingApi",
  baseQuery: fetchBaseQuery({ baseUrl: BE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.mutation<GameListType<GameListItemType[]>, string | undefined>({
      query: (search) => ({
        url: !!search ? `games?search=${search}` : "games",
        method: "GET"
      }),
      async onCacheEntryAdded(_, { dispatch, cacheDataLoaded }) {
        const cacheData = await cacheDataLoaded
        if (cacheData) {
          dispatch(setCategories(cacheData.data))
        }
      }
    }),
    getGame: builder.query<IGame, string>({
      query: (id) => `game/${id}`,
    }),
    getGameLeaders: builder.query<
      TGameLeader[],
      { id: string; limit?: number }
    >({
      query: ({ id, limit = 0 }) =>
        `leaders/?gameId=${id}${limit ? `&_limit=${limit}` : ""}`,
    }),
    getCategoryGames: builder.query<
      GameCategoryType<GameListItemType[]>,
      string
    >({
      query: (id) => `games/${id}`,
    }),
    searchGames: builder.mutation<
      GameCategoryType<GameListItemType[]>,
      { id: string; params: URLSearchParams }
    >({
      query: ({ id, params }) => ({
        url: `games/${id}?${params.toString()}`,
        method: "GET",
      }),
    }),
    getTopRateGames: builder.mutation<GameListItemType[], URLSearchParams | undefined>({
      query: (params) => !params ? 'top' : `top?${params.toString()}`
    })
  }),
});

export const {
  useGetGameQuery,
  useGetGameLeadersQuery,
  useGetCategoryGamesQuery,
  useSearchGamesMutation,
  useGetCategoriesMutation,
  useGetTopRateGamesMutation
} = gamingApi;
