// authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../api/api';
import { WalletInfoData } from '../../types/wallet';
import { CoinDto } from '../../types/assest';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    apiWalletInfo: builder.mutation<WalletInfoData, null>({
      query: () => ({
        url: '/info',
        method: 'GET',
      }),
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
