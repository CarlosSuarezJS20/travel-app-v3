import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  positionValue: number | boolean;
};

const initialnavigationTabsState: initialState = {
  positionValue: 0,
};

export const searchFeatureSlice = createSlice({
  name: "navigationTabsLocation",
  initialState: initialnavigationTabsState,
  reducers: {
    setPositionValue: (
      state,
      { payload: positionValue }: PayloadAction<number | boolean>
    ) => {
      state.positionValue = positionValue;
    },
  },
});

export const { setPositionValue } = searchFeatureSlice.actions;

export default searchFeatureSlice.reducer;
