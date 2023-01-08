import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const baseURL = "https://budget-world-reactjs.firebaseio.com";

// Fetches all items from Server
export const getTravelItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const responseItems = await axios.get(`${baseURL}/items.json`);
      return responseItems.data;
    } catch (error) {
      const error_body = error as AxiosError;
      return rejectWithValue(error_body);
    }
  }
);

type travelItem = {
  id: string;
  category: string;
  itemName: string;
  country: string;
  image: string;
  description: string;
  price: number;
};

type requestStatus = "idle" | "pending" | "succeeded" | "failed";

interface state {
  reqStatus: requestStatus;
  travelItems: travelItem[];
  error: null | string | undefined;
}

const initialState: state = {
  reqStatus: "idle",
  travelItems: [],
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTravelItems.pending, (state) => {
        state.reqStatus = "pending";
      })
      .addCase(getTravelItems.fulfilled, (state, action) => {
        //  Modelling data before I update the state
        const fetchedItems = [];
        for (let item in action.payload) {
          fetchedItems.push({
            ...action.payload[item],
            id: item,
          });
        }
        state.reqStatus = "succeeded";
        state.travelItems = fetchedItems;
      })
      .addCase(getTravelItems.rejected, (state, payload) => {
        state.reqStatus = "failed";
        state.error = payload.error.message;
      });
  },
});

export default itemsSlice.reducer;
