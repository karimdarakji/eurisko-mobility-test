import { ILogin } from "../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils";

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    Login: builder.mutation<any, ILogin>({
      query: (data) => ({
        url: `auth/signin`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = AuthApi;
