import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://budget-world-reactjs.firebaseio.com";

export const getItemsReqApi = createApi({
  reducerPath: "getItemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["travelItems"],
  endpoints: (builder) => ({}),
});
