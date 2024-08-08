import { createApi } from "@reduxjs/toolkit/query/react";

import { TransactionCreateDto, TransactionCreateDtoOut, TransactionDto } from "../../types/transaction";
import baseQuery from "../api/api";

export const trxApi = createApi({
  reducerPath: "trxApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    apiGetTransaction: builder.mutation<TransactionDto, string | undefined>({
      query: (trx) => ({
        url: `/transaction/${trx}`,
        method: "GET",
      }),
    }),
    apiPostCreateTransaction: builder.mutation<TransactionCreateDtoOut, TransactionCreateDto>({
      query: (body) => ({
        url: `/transaction/outcoming`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useApiGetTransactionMutation } = trxApi;
