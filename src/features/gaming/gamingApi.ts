import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AppsList,
  GameCategoryType,
  GameListItemType,
  IGame,
  TGameLeader,
} from '../../types/gameTypes';
import { setCategories } from './gamingSlice';
import baseQuery from '../api/api';

export const gamingApi = createApi({
  reducerPath: 'gamingApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.mutation<AppsList, string | undefined>({
      query: (search) => ({
        url: search ? `apps?search=${search}` : 'apps',
        method: 'GET',
      }),
      async onCacheEntryAdded(_, { dispatch, cacheDataLoaded }) {
        const cacheData = await cacheDataLoaded;
        if (cacheData) {
          dispatch(setCategories(cacheData.data));
        }
      },
    }),
    getGame: builder.query<IGame, string>({
      query: (id) => `app/${id}`,
    }),
    getGameLeaders: builder.query<
      TGameLeader[],
      { id: string; limit?: number }
    >({
      query: ({ id, limit = 0 }) =>
        `leaders/?gameId=${id}${limit ? `&_limit=${limit}` : ''}`,
    }),
    getCategoryGames: builder.query<AppsList, string>({
      query: (id) => `apps?categoryId=${id}`,
    }),
    searchGames: builder.mutation<
      GameCategoryType<GameListItemType[]>,
      { id: string; params: URLSearchParams }
    >({
      query: ({ id, params }) => ({
        url: `apps?categoryId=${id}&${params.toString()}`,
        method: 'GET',
      }),
    }),
    getTopRateGames: builder.mutation<
      GameListItemType[],
      URLSearchParams | undefined
    >({
      query: (params) => (!params ? 'top' : `top?${params.toString()}`),
    }),
  }),
});

export const {
  useGetGameQuery,
  useGetGameLeadersQuery,
  useGetCategoryGamesQuery,
  useSearchGamesMutation,
  useGetCategoriesMutation,
  useGetTopRateGamesMutation,
} = gamingApi;
