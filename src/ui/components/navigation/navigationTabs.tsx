import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { logIn, logOut } from "../../../store/reducers/authenticationReducer";

import { makeStyles } from "@mui/styles";

import theme from "../../../theme";

const useStyles = makeStyles(() => ({
  menuTab: {
    "&.MuiTab-root": {
      height: "4.5em",
      textTransform: "capitalize",
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

  //   temporal log in handler
  const handlesLogIn = () => {
    dispatch(logIn());
    // request
  };

  const handleslogOut = () => {
    dispatch(logOut());
  };

  const handleTabChange = (e: React.SyntheticEvent, tabValue: string) => {
    setTabValue(tabValue);
  };

  return (
    <Tabs
      value={tabValue}
      aria-label='secondary tabs example'
      textColor='secondary'
      indicatorColor='secondary'
      onChange={handleTabChange}>
      <Tab label='Home' value='home' className={classes.menuTab} />

      <Tab label='About' value='about' className={classes.menuTab} />
      {authenticationState.isAuthenticated ? (
        <Tab label='Countries' value='countries' className={classes.menuTab} />
      ) : null}
      {authenticationState.isAuthenticated ? (
        <Tab
          label='Log out'
          value='Log out'
          onClick={() => {
            handleslogOut();
          }}
          className={classes.menuTab}
        />
      ) : (
        <Tab
          label='Log in'
          value='Log in'
          onClick={() => {
            handlesLogIn();
          }}
          className={classes.menuTab}
        />
      )}
    </Tabs>
  );
};

export default NavigationTabs;
