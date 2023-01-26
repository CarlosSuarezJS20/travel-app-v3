import React from "react";
import { useAppSelector } from "../../../store/storeHooks";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
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
  avatarIconButton: {
    "&.MuiIconButton-root": {
      "&:hover": {
        background: "rgba(166, 37, 195, 0.10)",
      },
    },
  },
}));

const Header = () => {
  // authentication state for styling:
  const [checked, setChecked] = React.useState(false);
  const collapseChangeHandler = () => {
    setChecked((prevState) => !prevState);
  };
  // styling hooks from MUI
  const classes = useStyles();
  const matchesMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { isAuthenticated } = useAppSelector(
    (state) => state.autheticationReducer
  );

  return (
    <AppBar elevation={0} sx={{ borderBottom: "0.5px solid grey" }}>
      <Toolbar
        disableGutters
        sx={{ margin: matchesMdScreen ? "0 1em" : "0 2em", minWidth: "380px" }}
        key={"anchor"}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Grid container alignItems='center'>
              {matchesMdScreen ? (
                <Grid item>
                  <IconButton>
                    <MenuIcon fontSize='medium' sx={{ marginTop: "0.2em" }} />
                  </IconButton>
                </Grid>
              ) : null}
              <Grid item>
                <Typography variant='logo'>TravelUp</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              gap={matchesMdScreen ? 0.2 : 1}
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
                    <IconButton
                      className={classes.avatarIconButton}
                      size='small'>
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
  );
};

export default Header;
