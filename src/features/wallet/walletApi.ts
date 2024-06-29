// authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../api/api";
import { WalletInfoData } from "../../types/wallet";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    apiWalletInfo: builder.mutation<WalletInfoData, null>({
      query: () => ({
        url: "/info",
        method: "GET",
      }),
    }),
  }),
});

export const { useApiWalletInfoMutation } = walletApi;
