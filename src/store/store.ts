import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./reducers/authenticationReducer";
import searchFeatureReducer from "./reducers/searchFeatureReduce";
import navigationTabsReducer from "./reducers/navigationTabsReducer";

import { authApi } from "./features/apis/authApi";
import { getItemsReqApi } from "./features/apis/itemsApi";

export const rootStore = configureStore({
  reducer: {
    // api
    [authApi.reducerPath]: authApi.reducer, //testing new way
    [getItemsReqApi.reducerPath]: getItemsReqApi.reducer,
    autheticationReducer: authenticationReducer,
    searchFeatureReducer: searchFeatureReducer,
    navTabsPositionReducer: navigationTabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      getItemsReqApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
