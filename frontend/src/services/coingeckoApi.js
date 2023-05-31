import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL;
const createRequest = (url) => ({ url });
export const coingeckoApi = createApi({
  reducerPath: "coingeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (bulider) => ({
    getDepth: bulider.query({
      query: ({ coinid }) => createRequest(`marketdepth/${coinid}`),
    }),
  }),
});

export const { useGetDepthQuery } = coingeckoApi;
