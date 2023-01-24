import React, { useState } from "react";
import { Tabs, Tab, Button, Grid } from "@mui/material";
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
      height: "4.5em",
      textTransform: "capitalize",
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
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item>
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
              label='Countries'
              value='countries'
              className={classes.menuTab}
            />
          )}
        </Tabs>
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
