import { getRatingsReqApi } from "../apis/ratingsApi";

interface itemRating {
  cardId: string;
  cardRating: number;
  userId: string;
  id: string;
}

export const extendedRatingSlice = getRatingsReqApi.injectEndpoints({
  endpoints: (builder) => ({
    requestAllAverageRatings: builder.query<itemRating[], void>({
      query: () => "items-ratings.json?",
      transformResponse: (rawResults: itemRating[]) => {
        const fetchedItems: itemRating[] = [];
        for (let item in rawResults) {
          fetchedItems.push({
            ...rawResults[item],
            id: item,
          });
        }
        return fetchedItems;
      },
    }),
    // addNewTravelItem: builder.mutation(),
    // editTravelItem: builder.mutation(),
  }),
});

// hooks
export const { useRequestAllAverageRatingsQuery } = extendedRatingSlice;
