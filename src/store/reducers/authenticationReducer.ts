import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

interface authenticationState {
  isAuthenticated: boolean;
}

const initialAuthenticationState: authenticationState = {
  isAuthenticated: false,
};

export const counterSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { logIn, logOut } = counterSlice.actions;

export const persistedAuthenticationReducer = persistReducer(
  persistConfig,
  counterSlice.reducer
);
