import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://budget-world-reactjs.firebaseio.com";

export const getRatingsReqApi = createApi({
  reducerPath: "ratingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["itemRatings"],
  endpoints: (builder) => ({}),
});
