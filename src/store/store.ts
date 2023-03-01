import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./reducers/authenticationReducer";
import searchFeatureReducer from "./reducers/searchFeatureReduce";
import navigationTabsReducer from "./reducers/navigationTabsReducer";
import ratingItemsReducer from "./reducers/ratingItemsReducer";
import mainModalReducer from "./reducers/mainModalReducer";

import { authApi } from "./features/apis/authApi";
import { getItemsReqApi } from "./features/apis/itemsApi";
import { getRatingsReqApi } from "./features/apis/ratingsApi";

export const rootStore = configureStore({
  reducer: {
    // api
    [authApi.reducerPath]: authApi.reducer, //testing new way
    [getItemsReqApi.reducerPath]: getItemsReqApi.reducer,
    [getRatingsReqApi.reducerPath]: getRatingsReqApi.reducer,
    autheticationReducer: authenticationReducer,
    searchFeatureReducer: searchFeatureReducer,
    navTabsPositionReducer: navigationTabsReducer,
    ratings: ratingItemsReducer,
    mainModalReducer: mainModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      getItemsReqApi.middleware,
      getRatingsReqApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
