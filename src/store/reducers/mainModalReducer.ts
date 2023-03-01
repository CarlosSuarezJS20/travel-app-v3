import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  isModalOpen: boolean;
};

const initialMainModalState: initialState = {
  isModalOpen: false,
};

export const searchFeatureSlice = createSlice({
  name: "mainModalReducer",
  initialState: initialMainModalState,
  reducers: {
    handlesMainModalIsOpen: (
      state,
      { payload: isModalOpen }: PayloadAction<boolean>
    ) => {
      state.isModalOpen = isModalOpen;
    },
  },
});

export const { handlesMainModalIsOpen } = searchFeatureSlice.actions;

export default searchFeatureSlice.reducer;
