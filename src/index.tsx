import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { extendedItemsSlice } from "./store/features/travelItemsSlices/traveltems";

import { rootStore } from "./store/store";

// rootStore.dispatch(extendedItemsSlice.endpoints.getTravelItems.initiate());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
