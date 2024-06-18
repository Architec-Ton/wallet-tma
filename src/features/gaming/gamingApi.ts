import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGame, TGameLeader } from "../../types/gameTypes";

export const gamingApi = createApi({
  reducerPath: "gamingApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://my-json-server.typicode.com/vardanter/architec_games/"}),
  endpoints: builder => ({
    getGame: builder.query<IGame, string>({
      query: (id) => `games/${id}`
    }),
    getGameLeaders: builder.query<TGameLeader[], {id: string, limit?: number}>({
      query: ({id, limit = 0}) => `leaders/?gameId=${id}${ limit ? `&_limit=${limit}`: ''}`
    })
  })
})

export const { useGetGameQuery, useGetGameLeadersQuery } = gamingApi