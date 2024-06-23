import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GameCategoryType, GameListItemType, IGame, TGameLeader } from "../../types/gameTypes";

export const gamingApi = createApi({
  reducerPath: "gamingApi",
  baseQuery: fetchBaseQuery({baseUrl: "/api/v2/wallet/"}),
  endpoints: builder => ({
    getGame: builder.query<IGame, string>({
      query: (id) => `game/${id}`
    }),
    getGameLeaders: builder.query<TGameLeader[], {id: string, limit?: number}>({
      query: ({id, limit = 0}) => `leaders/?gameId=${id}${ limit ? `&_limit=${limit}`: ''}`
    }),
    getCategoryGames: builder.query<GameCategoryType<GameListItemType[]>, string>({
      query: (id) => `games/${id}`
    }),
    searchGames: builder.mutation<GameCategoryType<GameListItemType[]>, {id: string, params: URLSearchParams}>({
      query: ({ id, params }) => ({
        url: `games/${id}?${params.toString()}`,
        method: "GET"
      })
    })
  })
})

export const {
  useGetGameQuery,
  useGetGameLeadersQuery,
  useGetCategoryGamesQuery,
  useSearchGamesMutation
} = gamingApi