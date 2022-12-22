import React from "react";
import { AppBar, Toolbar, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import theme from "../../../theme";

const ToolBar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar color='transparent'>
        <Toolbar disableGutters>
          <Grid container>
            <MenuIcon fontSize='large' />
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default ToolBar;
