import { configureStore } from "@reduxjs/toolkit";

import { persistStore } from "redux-persist";

import { persistedAuthenticationReducer } from "./reducers/authenticationReducer";
import { authApi } from "./apis/authApi";

export const rootStore = configureStore({
  reducer: {
    // api
    [authApi.reducerPath]: authApi.reducer,
    autheticationReducer: persistedAuthenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export const persistor = persistStore(rootStore);
