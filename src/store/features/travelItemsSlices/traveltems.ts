import {
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { getItemsReqApi } from "../apis/itemsApi";

interface travelItem {
  id: string;
  category: string;
  itemName: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: string;
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

// orders items alphabetically
const travelItemsAdapter = createEntityAdapter<travelItem>({
  sortComparer: (a, b) => {
    let x = a.country.toLowerCase();
    let y = b.country.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  },
});

const initialState = travelItemsAdapter.getInitialState();

export const extendedItemsSlice = getItemsReqApi.injectEndpoints({
  endpoints: (builder) => ({
    getTravelItems: builder.query<EntityState<travelItem>, void>({
      query: () => "items.json",
      transformResponse: (rawResults: travelItem[]) => {
        const fetchedItems: travelItem[] = [];
        for (let item in rawResults) {
          fetchedItems.push({
            ...rawResults[item],
            id: item,
          });
        }
        return travelItemsAdapter.setAll(initialState, fetchedItems);
      },
      providesTags: (res) =>
        res?.ids
          ? [
              ...res.ids.map((id) => ({ type: "travelItems" as const, id })),
              { type: "travelItems", id: "TRAVEL_LIST" },
            ]
          : [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
    addNewTravelItem: builder.mutation<newTravelItem, Partial<newTravelItem>>({
      query: (travelItem) => {
        // destructuring for builidng the final request body
        const {
          token,
          itemName,
          userId,
          category,
          country,
          description,
          city,
          image,
          price,
        } = travelItem;

        const newTravelItem = {
          itemName: itemName,
          category: category,
          city: city,
          country: country,
          image: image,
          description: description,
          price: price,
          userId: userId,
        };
        return {
          url: `/items.json?auth=${token}`,
          method: "POST",
          body: newTravelItem,
        };
      },
      invalidatesTags: [{ type: "travelItems", id: "TRAVEL_LIST" }],
    }),
  }),
});

export const selectTravelItemsResponse =
  extendedItemsSlice.endpoints.getTravelItems.select();

export const selectTravelItemsData = createSelector(
  selectTravelItemsResponse,
  (travelItemsResponse) => travelItemsResponse.data
);

export const { useGetTravelItemsQuery, useAddNewTravelItemMutation } =
  extendedItemsSlice;

export const { selectAll: selectAllTravelItems } =
  travelItemsAdapter.getSelectors(
    (state: RootState) => selectTravelItemsData(state) ?? initialState
  );
