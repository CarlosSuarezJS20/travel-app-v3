import React, { useEffect, useState } from "react";
import { Tabs, Tab, Hidden } from "@mui/material";

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
  const [isLoggedIn, setIsLogIn] = useState(false);

  const classes = useStyles();

  //   temporal log in handler
  const handlesIsLogIn = () => {
    setIsLogIn((prev) => !prev);
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
      <Tab label='Countries' value='countries' className={classes.menuTab} />
      {isLoggedIn ? (
        <Tab
          label='Log out'
          value='Log out'
          onClick={() => {
            handlesIsLogIn();
          }}
          className={classes.menuTab}
        />
      ) : (
        <Tab
          label='Log in'
          value='Log in'
          onClick={() => {
            handlesIsLogIn();
          }}
          className={classes.menuTab}
        />
      )}
    </Tabs>
  );
};

export default NavigationTabs;
