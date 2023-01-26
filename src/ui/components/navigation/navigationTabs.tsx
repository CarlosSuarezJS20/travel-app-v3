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
  const [tabValue, setTabValue] = useState("home");
  const authenticationState = useAppSelector(
    (state) => state.autheticationReducer
  );
  const dispatch = useAppDispatch();

  const classes = useStyles();
  const matchesMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const loggingHandler = () => {
    if (authenticationState.isAuthenticated) {
      dispatch(setUserCredentials({ localId: null, idToken: null }));
      dispatch(logOut());
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
            <Tab label='Home' value='home' className={classes.menuTab} />
            <Tab label='About' value='about' className={classes.menuTab} />
            {authenticationState.isAuthenticated && (
              <Tab
                label='my trips'
                value='my trips'
                className={classes.menuTab}
              />
            )}
            {authenticationState.isAuthenticated && (
              <Tab
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
