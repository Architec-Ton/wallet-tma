// authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../api/api";
import { AuthInitData, TAuthType } from "../../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    apiAuth: builder.mutation<
      any,
      { initDataRaw?: AuthInitData; authType: TAuthType }
    >({
      query: (credentials: any) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useApiAuthMutation } = authApi;
