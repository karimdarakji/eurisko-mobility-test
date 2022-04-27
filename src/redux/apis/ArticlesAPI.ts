import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "../utils";

// Define a service using a base URL and expected endpoints
export const ArticlesApi = createApi({
  reducerPath: "ArticlesApi",
  baseQuery: baseQueryWithToken,
  tagTypes: ["Article"],
  endpoints: builder => ({
    getArticles: builder.query<any, number>({
      query: page => `articles?page=${page}`,
      providesTags: ["Article"],
      transformResponse: (response: any) => {
        return response?.response?.docs;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetArticlesQuery } = ArticlesApi;
