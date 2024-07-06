import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '../api/api';
import { BankBuyDto } from '../../types/banks';

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    apiGetBankBuy: builder.mutation<BankBuyDto, null>({
      query: () => ({
        url: '/bank/buy',
        method: 'GET',
      }),
    }),
  }),
});

export const { useApiGetBankBuyMutation } = bankApi;
