import { ThemeProvider } from "@mui/material/styles";
// components for UI
import Header from "./ui/components/navigation/header";
import MainTravelItems from "./ui/components/travelItems/mainTravelItems";
import SearchTravelItemsResults from "./ui/components/travelItems/seachTravelItemsResults";
import theme from "./theme";

import { useAppSelector } from "./store/storeHooks";
import { useEffect } from "react";

const App = () => {
  const searchFeatureState = useAppSelector(
    (state) => state.searchFeatureReducer.searchBody.searchTerm
  );

  useEffect(() => {
    console.log(searchFeatureState);
  }, [searchFeatureState]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {searchFeatureState.length > 0 ? (
        <SearchTravelItemsResults />
      ) : (
        <MainTravelItems />
      )}
    </ThemeProvider>
  );
};

export default App;
