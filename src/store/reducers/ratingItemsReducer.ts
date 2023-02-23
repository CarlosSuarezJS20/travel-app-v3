import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type rating = {
  cardId: string;
  cardRating: number;
  userId: string;
  id: string;
};

interface authenticationState {
  ratings: rating[] | [];
}

const initialAuthenticationState: authenticationState = {
  ratings: [],
};

export const ratingItemsSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    fetchItemsRatingFromApi: (state, actions: PayloadAction<rating[]>) => {
      state.ratings = actions.payload;
    },
  },
});

export const { fetchItemsRatingFromApi } = ratingItemsSlice.actions;

export default ratingItemsSlice.reducer;
