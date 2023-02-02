import { Box } from "@mui/material";
import Header from "./navigation/header";
import { Outlet } from "react-router-dom";

interface PropsLayout {
  isSearchBoxOpenHandler: () => void;
}

const Layout: React.FC<PropsLayout> = ({ isSearchBoxOpenHandler }) => {
  return (
    <Box>
      <Header isSearchBoxOpenHelper={isSearchBoxOpenHandler} />
      <Outlet />
    </Box>
  );
};

export default Layout;
