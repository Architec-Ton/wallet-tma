import { createApi } from "@reduxjs/toolkit/query/react";

import type { BankBuyDto, BankInfoDto } from "types/banks";
import type { ReferalsInfo } from "types/referals";

import baseQuery from "../api/api";

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery,
  endpoints: (builder) => ({
    apiGetBankBuy: builder.mutation<BankBuyDto, null>({
      query: () => ({
        url: "/bank/buy",
        method: "GET",
      }),
    }),
    apiGetBankReferrals: builder.query<ReferalsInfo, null>({
      query: () => "/bank/referal",
    }),
    apiGetBankInfo: builder.mutation<BankInfoDto, null>({
      query: () => "/bank/info",
    }),
  }),
});

export const { useApiGetBankBuyMutation, useApiGetBankReferralsQuery, useApiGetBankInfoMutation } = bankApi;
