import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type searchQueryBody = {
  searchTerm: string;
  typeOfSearch: string;
};

interface searchFeatureState {
  isSearching: boolean;
  searchBody: searchQueryBody;
}

const initialsearchFeatureState: searchFeatureState = {
  isSearching: false,
  searchBody: {
    searchTerm: "",
    typeOfSearch: "",
  },
};

export const searchFeatureSlice = createSlice({
  name: "searchFeature",
  initialState: initialsearchFeatureState,
  reducers: {
    setSearchingMode: (state) => {
      state.isSearching = !state.isSearching;
    },
    searchBody: (
      state,
      { payload: { searchTerm, typeOfSearch } }: PayloadAction<searchQueryBody>
    ) => {
      state.searchBody.searchTerm = searchTerm;
      state.searchBody.typeOfSearch = typeOfSearch;
    },
  },
});

export const { setSearchingMode, searchBody } = searchFeatureSlice.actions;

export default searchFeatureSlice.reducer;
