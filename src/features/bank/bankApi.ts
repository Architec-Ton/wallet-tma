import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '../api/api';
import { BankBuyDto } from '../../types/banks';
import { ReferalsInfo } from '../../types/referals';

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
    apiGetBankReferrals: builder.query<ReferalsInfo, null>({
      query: () => "/bank/referal"
    })
  }),
});

export const { useApiGetBankBuyMutation, useApiGetBankReferralsQuery } = bankApi;
