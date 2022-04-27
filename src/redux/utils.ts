import type { RootState } from "../app/store";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { logout } from "./slices/UserSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://34.245.213.76:3000/",
}) as any;

const baseQueryWithHeader = fetchBaseQuery({
  baseUrl: "http://34.245.213.76:3000/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;

    // If we have a token set in state, let's assume that we should be passing it.

    headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

export const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithHeader(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};
