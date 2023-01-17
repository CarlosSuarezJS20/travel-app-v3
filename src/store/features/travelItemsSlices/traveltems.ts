import {
  createSelector,
  createEntityAdapter,
  EntityState,
  EntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getItemsReqApi } from "../apis/itemsApi";

interface travelItem {
  id: string;
  category: string;
  itemName: string;
  country: string;
  image: string;
  description: string;
  price: number;
}

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
        console.log(fetchedItems);
        return travelItemsAdapter.setAll(initialState, fetchedItems);
      },
      providesTags: (res) =>
        res?.ids
          ? [
              ...res.ids.map((id) => ({ type: "travelItems" as const, id })),
              { type: "travelItems", id: "travelList" },
            ]
          : [{ type: "travelItems", id: "listTravelItems" }],
    }),
  }),
});

export const selectTravelItemsResponse =
  extendedItemsSlice.endpoints.getTravelItems.select();

export const selectTravelItemsData = createSelector(
  selectTravelItemsResponse,
  (travelItemsResponse) => travelItemsResponse.data
);

export const { useGetTravelItemsQuery } = extendedItemsSlice;

export const { selectAll: selectAllTravelItems } =
  travelItemsAdapter.getSelectors(
    (state: RootState) => selectTravelItemsData(state) ?? initialState
  );
