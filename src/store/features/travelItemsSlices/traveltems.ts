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
  token?: string;
}

interface newTravelItem {
  category: string;
  itemName: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: number;
  userId: string;
  token: string;
}

interface deleteReq {
  token: string;
  id: string;
}

export const extendedItemsSlice = getItemsReqApi.injectEndpoints({
  endpoints: (builder) => ({
    getTravelItems: builder.query<travelItem[], void>({
      query: () => "items.json",
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
    addNewTravelItem: builder.mutation<newTravelItem, Partial<newTravelItem>>({
      query: ({
        category,
        city,
        country,
        description,
        image,
        itemName,
        price,
        token,
      }) => {
        return {
          url: `/items.json?auth=${token}`,
          method: "POST",
          body: {
            category,
            city,
            country,
            description,
            image,
            itemName,
            price,
          },
        };
      },
      invalidatesTags: [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
    editTravelItem: builder.mutation<travelItem, Partial<travelItem>>({
      query: ({
        id,
        category,
        city,
        country,
        description,
        image,
        itemName,
        price,
        token,
      }) => {
        // destructuring for builidng the final request body
        return {
          url: `items/${id}.json?auth=${token}`,
          method: "PATCH",
          body: {
            category,
            city,
            country,
            description,
            image,
            itemName,
            price,
          },
        };
      },
      invalidatesTags: [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
    deleteItem: builder.mutation<deleteReq, Partial<deleteReq>>({
      query: ({ id, token }) => {
        // destructuring for builidng the final request body
        return {
          url: `items/${id}.json?auth=${token}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
  }),
});

// hooks
export const {
  useDeleteItemMutation,
  useGetTravelItemsQuery,
  useAddNewTravelItemMutation,
  useEditTravelItemMutation,
} = extendedItemsSlice;
