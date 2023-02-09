import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import Header from "./navigation/header";
import { Outlet } from "react-router-dom";
import MainDrawerMenu from "./navigation/mainDrawer";

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
      <MainDrawerMenu
        isOpen={isDrawerOpen}
        toggleHandler={toggleDrawerHandler}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
