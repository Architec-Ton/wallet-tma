import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// TODO: fiz this imports
import { BE_URL } from "../../constants";
import type { RootState } from "../../store";

const baseQuery = fetchBaseQuery({
  baseUrl: BE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQuery;
