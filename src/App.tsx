import { useCallback, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
// components for UI

import MainTravelItems from "./ui/components/travelItems/mainTravelItems";
import Layout from "./ui/components/layout";
import theme from "./theme";

import { Box } from "@mui/material";
import { Routes, Route } from "react-router";
import { NavLink } from "react-router-dom";

// Router

const App = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  // This here is a work around so the div that holds the travel items moves along with the search box that slides down
  const isSearchBoxOpenHandler = useCallback(() => {
    setIsSearchBoxOpen((prev) => !prev);
  }, [isSearchBoxOpen]);

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
            element={<Box sx={{ margin: "5em 2em" }}>my wishList</Box>}
          />
          <Route
            path='search-travel'
            element={<MainTravelItems isSearchBoxOpen={isSearchBoxOpen} />}
          />
        </Route>
        {/* <Route path='/add-new' element={<div>add new</div>} /> */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
