import React, { useState } from "react";
import {
  Toolbar,
  Grid,
  Typography,
  InputBase,
  Button,
  Collapse,
  Box,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import SearchIcon from "@mui/icons-material/Search";

import theme from "../../../theme";

// classes
const useStyles = makeStyles(() => ({
  searchInput: {
    "&.MuiInputBase-root": {
      width: "19em",
      border: "0.5px solid black",
      borderRadius: "10px 0 0 10px",
      padding: "0 1em",
      [theme.breakpoints.down("sm")]: {
        width: "14em",
      },
    },
  },
}));

interface PropsSearch {
  isChecked: boolean;
}

const SearchCapability: React.FC<PropsSearch> = ({ isChecked }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Collapse in={isChecked}>
      <Toolbar sx={{ borderTop: "0.5px solid grey" }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item>
            <Box>
              <InputBase
                className={classes.searchInput}
                placeholder='Search by Country or City'
              />
            </Box>
          </Grid>
          <Grid item>
            <Button
              disableFocusRipple
              disabled
              disableElevation
              sx={{
                background: theme.palette.common.black,
                borderRadius: "0 10px 10px 0",
                padding: "5px",
                textTransform: "capitalize",
                "&:hover": {
                  background: theme.palette.common.black,
                },
                "&.Mui-disabled": {
                  color: "white",
                },
              }}>
              <SearchIcon fontSize='small' />
              <Typography sx={{ fontWeight: "bold" }}>Search</Typography>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </Collapse>
  );
};

export default SearchCapability;
