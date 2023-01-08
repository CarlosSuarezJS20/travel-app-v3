import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type response = {
  id: string;
  category: string;
  itemName: string;
  country: string;
  image: string;
  description: string;
  price: number;
}[];

const baseURL = "https://budget-world-reactjs.firebaseio.com";

export const getItemsReqApi = createApi({
  reducerPath: "getItemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["items"],
  endpoints: (builder) => ({
    getTravelItems: builder.query<response, null>({
      query: () => "/items.json",
      providesTags: ["items"],
    }),
  }),
});

export const { useGetTravelItemsQuery } = getItemsReqApi;
