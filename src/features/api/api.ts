import { BE_URL } from "../../constants";
import { RootState } from "../../store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

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
