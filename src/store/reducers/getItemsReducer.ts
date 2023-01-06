import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export const getTravelItems: any = createAsyncThunk(
  "items/fetchItems",
  async () => {
    try {
      const responseItems = await axios.get(
        "https://budget-world-reactjs.firebaseio.com/items.json"
      );
      return responseItems.data;
    } catch (err) {
      console.log(err);
    }
  }
);

interface state {
  loading: boolean;
  items: { itemName: string }[];
  error: null | any;
}

const initialState: state = {
  loading: false,
  items: [],
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: {
    // The reducer for the fetchUser async action
    [getTravelItems.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTravelItems.fulfilled]: (state, action) => {
      const fetchedItems = [];
      for (let item in action.payload) {
        fetchedItems.push({
          ...action.payload[item],
          id: item,
        });
      }
      state.loading = false;
      state.items = fetchedItems;
    },
    [getTravelItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default itemsSlice.reducer;
