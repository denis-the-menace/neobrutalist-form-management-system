import { apiSlice } from "./apiSlice";

export const countriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: `/countries`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApiSlice;

