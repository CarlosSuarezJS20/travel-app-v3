import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Toolbar,
  Grid,
  Typography,
  InputBase,
  Button,
  Collapse,
  Box,
  FormControl,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../../store/storeHooks";
import {
  setSearchingMode,
  searchBody,
} from "../../../store/reducers/searchFeatureReduce";

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
  const [typeOfQuery, setTypeOfQuery] = useState("country");
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchQuery.length === 0) {
      dispatch(searchBody({ searchTerm: "", typeOfSearch: "" }));
    }
  }, [searchQuery]);

  const handlesInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlesOnClickSearchReq = () => {
    dispatch(setSearchingMode());
    dispatch(
      searchBody({ searchTerm: searchQuery, typeOfSearch: typeOfQuery })
    );
  };

  return (
    <Collapse in={isChecked}>
      <Toolbar sx={{ borderTop: "0.5px solid grey" }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid item>
                <Box>
                  <InputBase
                    className={classes.searchInput}
                    value={searchQuery}
                    onChange={handlesInputOnchange}
                    placeholder='Search by Country or City'
                  />
                </Box>
              </Grid>
              <Grid item>
                <Button
                  disableFocusRipple
                  disabled={searchQuery.length > 0 ? false : true}
                  disableElevation
                  onClick={handlesOnClickSearchReq}
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
          </Grid>
          <Grid item>
            <Grid container width='100px'></Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </Collapse>
  );
};

export default SearchCapability;
