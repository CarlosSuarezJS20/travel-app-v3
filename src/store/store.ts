import { configureStore } from "@reduxjs/toolkit";

import { persistStore } from "redux-persist";

import { persistedAuthenticationReducer } from "./reducers/authenticationReducer";

export const rootStore = configureStore({
  reducer: {
    autheticationReducer: persistedAuthenticationReducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export const persistor = persistStore(rootStore);
