import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL;

const createRequest = (url) => ({ url });

export const nomicsApi = createApi({
  reducerPath: "nomicssApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (bulider) => ({
    getCoins: bulider.query({
      query: () => createRequest(`/nomicsdata/coinid`),
    }),
    getFiatCoins: bulider.query({
      query: (fiat) => createRequest(`/nomicsdata/coins/${fiat}`),
    }),
    getGainers: bulider.query({
      query: () => createRequest(`/nomicsdata/biggestdailygainer`),
    }),
    getCoinData: bulider.query({
      query: ({ id }) => createRequest(`/nomicsdata/coinid/${id}`),
    }),
    getCoinCSVData: bulider.query({
      query: ({ id }) => createRequest(`/csv/coingeckoid/${id}`),
    }),
    getCoinHistory: bulider.query({
      query: ({ timePeriod, id }) =>
        createRequest(`/cryptodata/${timePeriod}/${id}`),
    }),
    getStatus: bulider.query({
      query: () => createRequest(`/csv/status`),
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetFiatCoinsQuery,
  useGetCoinCSVDataQuery,
  useGetStatusQuery,
  useGetCoinHistoryQuery,
  useGetCoinDataQuery,
  useGetGainersQuery,
} = nomicsApi;

export const { endpoints, reducerPath, reducer, middleware } = nomicsApi;
