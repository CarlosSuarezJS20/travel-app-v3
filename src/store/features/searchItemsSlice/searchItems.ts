import { getItemsReqApi } from "../apis/itemsApi";

interface travelItem {
  id: string;
  category: string;
  itemName: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: number;
  token: string;
}

export const extendedItemsSlice = getItemsReqApi.injectEndpoints({
  endpoints: (builder) => ({
    searchTravelItemsByCountry: builder.query<travelItem[], string>({
      query: (search) =>
        "items.json" + `?orderBy="country"&equalTo="${search}"`,
      transformResponse: (rawResults: travelItem[]) => {
        console.log(rawResults);
        const fetchedItems: travelItem[] = [];
        for (let item in rawResults) {
          fetchedItems.push({
            ...rawResults[item],
            id: item,
          });
        }
        return fetchedItems;
      },
      providesTags: (res) =>
        res
          ? [
              ...res.map(({ id }) => ({ type: "travelItems" as const, id })),
              { type: "travelItems", id: "TRAVEL_LIST" },
            ]
          : [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
    searchTravelItemsByCity: builder.query<travelItem[], void>({
      query: (search) => "items.json" + `?orderBy="city"&equalTo="${search}"`,
      transformResponse: (rawResults: travelItem[]) => {
        const fetchedItems: travelItem[] = [];
        for (let item in rawResults) {
          fetchedItems.push({
            ...rawResults[item],
            id: item,
          });
        }
        return fetchedItems;
      },
      providesTags: (res) =>
        res
          ? [
              ...res.map(({ id }) => ({ type: "travelItems" as const, id })),
              { type: "travelItems", id: "TRAVEL_LIST" },
            ]
          : [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
  }),
});

// hooks
export const {
  useSearchTravelItemsByCountryQuery,
  useSearchTravelItemsByCityQuery,
} = extendedItemsSlice;
