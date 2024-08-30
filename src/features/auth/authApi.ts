// authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";

import type { AuthInitTon, TAuthType } from "types/auth";

import baseQuery from "../api/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    apiAuth: builder.mutation<any, { initDataRaw?: string; authType: TAuthType; initTon?: AuthInitTon }>({
      query: (credentials: any) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useApiAuthMutation } = authApi;
