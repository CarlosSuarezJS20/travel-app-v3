import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

interface authenticationState {
  isAuthenticated: boolean;
  userInfo: {
    localId: string | null;
    idToken: string | null;
  };
}

const initialAuthenticationState: authenticationState = {
  isAuthenticated: false,
  userInfo: {
    localId: null,
    idToken: null,
  },
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
    setUserCredentials: (
      state,
      {
        payload: { localId, idToken },
      }: PayloadAction<{ localId: string | null; idToken: string | null }>
    ) => {
      state.userInfo.localId = localId;
      state.userInfo.idToken = idToken;
    },
  },
});

export const { logIn, logOut, setUserCredentials } = counterSlice.actions;

export const persistedAuthenticationReducer = persistReducer(
  persistConfig,
  counterSlice.reducer
);
