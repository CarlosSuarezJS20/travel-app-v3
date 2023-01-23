import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { makeStyles } from "@mui/styles";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import profileImage from "../../../asset/profile.jpg";

import theme from "../../../theme";

// Tailored components
import NavigationTabs from "./navigationTabs";

const useStyles = makeStyles(() => ({}));

const Header: React.FC = () => {
  // authentication state for styling:
  const { isAuthenticated } = useAppSelector(
    (state) => state.autheticationReducer
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar disableGutters sx={{ margin: "0 6.25em" }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Grid container alignItems='center'>
                <Grid item>
                  <MenuIcon fontSize='large' sx={{ marginTop: "0.2em" }} />
                </Grid>
                <Grid item>
                  <Typography variant='logo'>TravelUp</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                gap={3}
                justifyContent='center'
                alignItems='center'>
                <Grid item>
                  <NavigationTabs />
                </Grid>
                {isAuthenticated ? (
                  <>
                    {" "}
                    <Grid item>
                      <SearchIcon
                        fontSize='medium'
                        sx={{ marginTop: "0.3em" }}
                      />
                    </Grid>
                    <Grid item>
                      <Avatar alt='profile picture' src={profileImage} />
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
