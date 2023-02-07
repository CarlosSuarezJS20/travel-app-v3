import { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
// components for UI

import MainTravelItems from "./ui/components/travelItems/mainTravelItems";
import Layout from "./ui/components/layout";
import theme from "./theme";

import { Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router";

// Router

const App = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const currentLocation = useLocation();

  // This here is a work around so the div that holds the travel items moves along with the search box that slides down
  const isSearchBoxOpenHandler = useCallback(() => {
    setIsSearchBoxOpen((prev) => !prev);
  }, [isSearchBoxOpen]);

  // I'm using this useEffect to hide the search bar if user leaves the search-travel path
  useEffect(() => {
    if (currentLocation.pathname !== "/search-travel" && isSearchBoxOpen) {
      console.log(isSearchBoxOpen);
      setIsSearchBoxOpen(false);
    }
  }, [currentLocation.pathname, isSearchBoxOpen, setIsSearchBoxOpen]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path='/'
          element={<Layout isSearchBoxOpenHandler={isSearchBoxOpenHandler} />}>
          <Route
            path='/'
            element={<Box sx={{ margin: "5em 2em" }}>Welcome, Sign up!</Box>}
          />
          <Route
            path='about'
            element={<Box sx={{ margin: "5em 2em" }}>About</Box>}
          />
          <Route
            path='my-wishlist'
            element={<Box sx={{ margin: "5em 2em" }}>my wishList</Box>}
          />
          <Route
            path='my-trips'
            element={<Box sx={{ margin: "5em 2em" }}>my trips</Box>}
          />
          <Route
            path='search-travel'
            element={<MainTravelItems isSearchBoxOpen={isSearchBoxOpen} />}
          />
        </Route>
        <Route
          path='my-profile'
          element={<Box sx={{ margin: "1em 2em" }}>profile</Box>}
        />
      </Routes>
      {/* <Route
        path='my-profile'
        element={<Box sx={{ margin: "5em 2em" }}>profile</Box>}
      /> */}
    </ThemeProvider>
  );
};

export default App;
