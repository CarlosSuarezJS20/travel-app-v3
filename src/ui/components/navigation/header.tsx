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
  InputBase,
  Box,
  Button,
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

const useStyles = makeStyles(() => ({
  searchInput: {
    "&.MuiInputBase-input": {
      border: "1px solid #ced4da",
    },
  },
}));

const Header: React.FC = () => {
  // authentication state for styling:
  const classes = useStyles();
  const { isAuthenticated } = useAppSelector(
    (state) => state.autheticationReducer
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar elevation={0} sx={{ borderBottom: "0.5px solid grey" }}>
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
                      <IconButton>
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
        <Toolbar sx={{ borderTop: "0.5px solid grey" }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
              <Box>
                <InputBase
                  placeholder='Search by Country or City'
                  sx={{
                    width: "19em",
                    border: "0.5px solid black",
                    borderRadius: "10px 0 0 10px",
                    padding: "0 1em",
                  }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Button
                disableFocusRipple
                disableElevation
                sx={{
                  background: theme.palette.common.black,
                  borderRadius: "0 10px 10px 0",
                  padding: "5px",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: theme.palette.common.black,
                  },
                }}>
                <SearchIcon fontSize='small' />
                <Typography sx={{ fontWeight: "bold" }}>Search</Typography>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
