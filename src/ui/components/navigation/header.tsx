import React, { useEffect } from "react";
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

// Routing
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

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

interface PropsHeader {
  isSearchBoxOpenHelper: () => void;
}

const Header: React.FC<PropsHeader> = ({ isSearchBoxOpenHelper }) => {
  // authentication state for styling:
  const [checked, setChecked] = React.useState(false);
  const currentLocation = useLocation();

  const collapseChangeHandler = () => {
    isSearchBoxOpenHelper();
    setChecked((prevState) => !prevState);
  };

  // I'm using this useEffect to hide the search bar if user leaves the search-travel path
  useEffect(() => {
    if (currentLocation.pathname !== "/search-travel" && checked) {
      console.log(checked);
      setChecked(false);
    }
  }, [checked, currentLocation.pathname, setChecked]);

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
        sx={{ margin: matchesMdScreen ? "0 1em" : "0 2em", minWidth: "380px" }} //added this min width her for the tool bar
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
                    {currentLocation.pathname !== "/search-travel" ||
                    currentLocation.pathname !==
                      "/search-travel" ? null : currentLocation.pathname ===
                      "/search-travel" ? (
                      <IconButton onClick={collapseChangeHandler}>
                        <SearchIcon fontSize='medium' />
                      </IconButton>
                    ) : (
                      <IconButton component={Link} to='/search-travel'>
                        <SearchIcon fontSize='medium' />
                      </IconButton>
                    )}
                    {/* conditions the button and if the user is not in the search component it will be a link instead   */}
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
