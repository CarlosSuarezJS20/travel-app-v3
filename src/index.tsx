import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";

import { persistor, rootStore } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
