import React, { useState } from "react";
import { Tabs, Tab, Button, Grid, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import {
  logIn,
  logOut,
  setUserCredentials,
} from "../../../store/reducers/authenticationReducer";

import { makeStyles } from "@mui/styles";

import theme from "../../../theme";

// Routing
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useAppDispatch();
  const matchesMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigateTo = useNavigate();
  const [tabValue, setTabValue] = useState("home");
  const authenticationState = useAppSelector(
    (state) => state.autheticationReducer
  );

  const loggingHandler = () => {
    if (authenticationState.isAuthenticated) {
      dispatch(setUserCredentials({ localId: null, idToken: null }));
      // deals with all updates required in nav tabs and routing ui changes
      dispatch(logOut());
      navigateTo("/");
      setTabValue("home");
      return;
    }
    dispatch(logIn());
  };

  const handleTabChange = (e: React.SyntheticEvent, tabValue: string) => {
    setTabValue(tabValue);
  };

  return (
    <Grid container gap={2} justifyContent='center' alignItems='center'>
      <Grid item>
        {matchesMediumScreen ? null : (
          <Tabs
            value={tabValue}
            aria-label='secondary tabs example'
            textColor='secondary'
            indicatorColor='secondary'
            onChange={handleTabChange}>
            <Tab
              component={Link}
              to='/about'
              label='About'
              value='about'
              className={classes.menuTab}
            />
            <Tab
              component={Link}
              to='/'
              label='Home'
              value='home'
              className={classes.menuTab}
            />
            {authenticationState.isAuthenticated && (
              <Tab
                label='my trips'
                value='my trips'
                className={classes.menuTab}
              />
            )}
            {authenticationState.isAuthenticated && (
              <Tab
                component={Link}
                to='/search-travel'
                label='search'
                value='search'
                className={classes.menuTab}
              />
            )}
            {authenticationState.isAuthenticated && (
              <Tab
                component={Link}
                to='/my-wishlist'
                label='My wishlist'
                value='My wishlist'
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
