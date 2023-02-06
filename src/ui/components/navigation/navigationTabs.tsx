import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, Grid, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import {
  logIn,
  logOut,
  setUserCredentials,
} from "../../../store/reducers/authenticationReducer";
import { setPositionValue } from "../../../store/reducers/navigationTabsReducer";

import { makeStyles } from "@mui/styles";

import theme from "../../../theme";

// Routing
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

const useStyles = makeStyles(() => ({
  menuTab: {
    "&.MuiTab-root": {
      fontSize: "1em",
      textTransform: "capitalize",
      height: "62px",
    },
  },
  userLogInAndOutBtn: {
    "&.MuiButton-root": {
      ...theme.typography.genericBtn,
      "&:hover": {
        background: theme.palette.secondary.dark,
      },
    },
  },
}));

const NavigationTabs: React.FC = () => {
  const classes = useStyles();
  const currentLocation = useLocation();
  const dispatch = useAppDispatch();
  const matchesMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigateTo = useNavigate();

  const authenticationState = useAppSelector(
    (state) => state.autheticationReducer
  );

  const navtabsPositionState = useAppSelector(
    (state) => state.navTabsPositionReducer
  );

  useEffect(() => {
    console.log(currentLocation);
    switch (currentLocation.pathname) {
      case "/":
        if (navtabsPositionState.positionValue != 0) {
          dispatch(setPositionValue(0));
        }
        break;
      case "/about":
        if (navtabsPositionState.positionValue != 1) {
          dispatch(setPositionValue(1));
        }
        break;
      case "/my-trips":
        if (navtabsPositionState.positionValue != 2) {
          dispatch(setPositionValue(2));
        }
        break;
      case "search-travel":
        if (navtabsPositionState.positionValue != 3) {
          dispatch(setPositionValue(3));
        }
        break;
      case "my-wishlist":
        if (navtabsPositionState.positionValue != 4) {
          dispatch(setPositionValue(4));
        }
        break;
      default:
        break;
    }
  }, [currentLocation]);

  const loggingHandler = () => {
    if (authenticationState.isAuthenticated) {
      dispatch(setUserCredentials({ localId: null, idToken: null }));
      // deals with all updates required in nav tabs and routing ui changes
      dispatch(logOut());
      navigateTo("/");
      dispatch(setPositionValue(0));
      return;
    }
    dispatch(logIn());
  };

  const handleTabChange = (e: React.SyntheticEvent, tabValue: number) => {
    dispatch(setPositionValue(tabValue));
  };

  return (
    <Grid container gap={2} justifyContent='center' alignItems='center'>
      <Grid item>
        {matchesMediumScreen ? null : (
          <Tabs
            value={navtabsPositionState.positionValue}
            aria-label='secondary tabs example'
            textColor='secondary'
            indicatorColor='secondary'
            onChange={handleTabChange}>
            <Tab
              component={Link}
              to='/about'
              label='About'
              value={1}
              className={classes.menuTab}
            />
            <Tab
              component={Link}
              to='/'
              label='Home'
              value={0}
              className={classes.menuTab}
            />
            {authenticationState.isAuthenticated && (
              <Tab
                component={Link}
                to='/my-trips'
                label='my trips'
                value={2}
                className={classes.menuTab}
              />
            )}
            {authenticationState.isAuthenticated && (
              <Tab
                component={Link}
                to='/search-travel'
                label='search'
                value={3}
                className={classes.menuTab}
              />
            )}
            {authenticationState.isAuthenticated && (
              <Tab
                component={Link}
                to='/my-wishlist'
                label='My wishlist'
                value={4}
                className={classes.menuTab}
              />
            )}
          </Tabs>
        )}
      </Grid>
      <Grid item>
        <Button
          className={classes.userLogInAndOutBtn}
          disableRipple
          variant='contained'
          onClick={() => {
            loggingHandler();
          }}>
          {authenticationState.isAuthenticated ? "log out" : "log in"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavigationTabs;
