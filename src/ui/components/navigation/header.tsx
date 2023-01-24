import React from "react";
import { useAppSelector } from "../../../store/storeHooks";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  CssBaseline,
  Avatar,
  IconButton,
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
import SearchCapability from "../searchCapability/searchBar";

const useStyles = makeStyles(() => ({
  searchInput: {
    "&.MuiInputBase-input": {
      border: "1px solid #ced4da",
    },
  },
}));

const Header = () => {
  // authentication state for styling:
  const [checked, setChecked] = React.useState(false);
  const collapseChangeHandler = () => {
    setChecked((prevState) => !prevState);
  };
  const classes = useStyles();

  const { isAuthenticated } = useAppSelector(
    (state) => state.autheticationReducer
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position='sticky'
        elevation={0}
        sx={{ position: "relative", borderBottom: "0.5px solid grey" }}>
        <Toolbar disableGutters sx={{ margin: "0 6.25em" }} key={"anchor"}>
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
                gap={1}
                justifyContent='center'
                alignItems='center'>
                <Grid item>
                  <NavigationTabs />
                </Grid>
                {isAuthenticated && (
                  // conditional rendering login options
                  <>
                    <Grid item>
                      <IconButton onClick={collapseChangeHandler}>
                        <SearchIcon fontSize='medium' />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton size='small'>
                        <Avatar alt='profile picture' src={profileImage} />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <SearchCapability isChecked={checked} />
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
