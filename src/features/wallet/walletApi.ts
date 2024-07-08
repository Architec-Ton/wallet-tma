// authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../api/api';
import { WalletInfoData } from '../../types/wallet';
import { CoinDto } from '../../types/assest';
import { setTonUsdPrice } from './walletSlice';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    apiWalletInfo: builder.mutation<WalletInfoData, null>({
      query: () => ({
        url: '/info',
        method: 'GET',
      }),
      async onCacheEntryAdded(_, { dispatch, cacheDataLoaded }) {
        const cacheData = await cacheDataLoaded;
        if (cacheData) {
          const { tonUsdPrice = 0 } = cacheData.data
          dispatch(setTonUsdPrice(tonUsdPrice));
        }
      },
    }),
    apiWalletAssets: builder.mutation<CoinDto[], null>({
      query: () => ({
        url: '/assets',
        method: 'GET',
      }),
    }),
  }),
});

export const { useApiWalletInfoMutation, useApiWalletAssetsMutation } =
  walletApi;
