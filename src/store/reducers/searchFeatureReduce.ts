import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type searchQueryBody = {
  searchTerm: string;
  typeOfSearch: string;
};

interface searchFeatureState {
  searchBody: searchQueryBody;
}

const initialsearchFeatureState: searchFeatureState = {
  searchBody: {
    searchTerm: "",
    typeOfSearch: "",
  },
};

export const searchFeatureSlice = createSlice({
  name: "searchFeature",
  initialState: initialsearchFeatureState,
  reducers: {
    searchBody: (
      state,
      { payload: { searchTerm, typeOfSearch } }: PayloadAction<searchQueryBody>
    ) => {
      state.searchBody.searchTerm = searchTerm;
      state.searchBody.typeOfSearch = typeOfSearch;
    },
  },
});

export const { searchBody } = searchFeatureSlice.actions;

export default searchFeatureSlice.reducer;
