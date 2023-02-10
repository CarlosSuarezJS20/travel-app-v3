import React, { Suspense, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Header from "./navigation/header";
import { Outlet } from "react-router-dom";

const MainDrawerMenu = React.lazy(() => import("./navigation/mainDrawer"));

interface PropsLayout {
  isSearchBoxOpenHandler: () => void;
}

const Layout: React.FC<PropsLayout> = ({ isSearchBoxOpenHandler }) => {
  // state for the MainDrawer:
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // handles TooltipMenus
  const toggleDrawerHandler = useCallback(
    (isOpen: boolean) => {
      setIsDrawerOpen(isOpen);
    },
    [isDrawerOpen]
  );

  return (
    <Box>
      <Header
        isSearchBoxOpenHelper={isSearchBoxOpenHandler}
        toogleMenuDrawerHandler={toggleDrawerHandler}
      />
      <Suspense fallback={<Box>loading...</Box>}>
        <MainDrawerMenu
          isOpen={isDrawerOpen}
          toggleHandler={toggleDrawerHandler}
        />
      </Suspense>
      <Outlet />
    </Box>
  );
};

export default Layout;
