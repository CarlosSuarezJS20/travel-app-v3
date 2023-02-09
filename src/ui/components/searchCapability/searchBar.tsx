import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Toolbar,
  Grid,
  Typography,
  InputBase,
  Button,
  Collapse,
  Box,
  Radio,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../../store/storeHooks";
import { searchBody } from "../../../store/reducers/searchFeatureReduce";

import theme from "../../../theme";

// improve UI and search logic for input value

// classes
const useStyles = makeStyles(() => ({
  searchInput: {
    "&.MuiInputBase-root": {
      width: "16em",
      border: "0.5px solid black",
      borderRadius: "10px 0 0 10px",
      padding: "0 1em",
      [theme.breakpoints.down("sm")]: {
        width: "10em",
      },
    },
  },
}));

interface PropsSearch {
  isChecked: boolean;
}

const SearchCapability: React.FC<PropsSearch> = ({ isChecked }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeOfSearch, setselectedTypeOfSearch] = useState("country");
  const mediaQuerySm = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if the user deletes query this will add back the general items component "mainTravelItems component"
    if (searchQuery.length === 0) {
      dispatch(searchBody({ searchTerm: "", typeOfSearch: "" }));
    }
  }, [searchQuery, dispatch, searchBody]);

  const handlesInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRadioSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setselectedTypeOfSearch(event.target.value);
  };

  const handlesOnClickSearchReq = () => {
    dispatch(
      searchBody({
        searchTerm: searchQuery,
        typeOfSearch: selectedTypeOfSearch,
      })
    );
  };

  return (
    <Collapse in={isChecked}>
      <Toolbar sx={{ borderTop: "0.5px solid grey" }}>
        <Grid
          sx={{ marginTop: mediaQuerySm ? "0.5em" : "0", minWidth: "380px" }}
          container
          direction={mediaQuerySm ? "column" : "row"}
          gap={mediaQuerySm ? 0 : 2}
          justifyContent='center'
          alignItems='center'>
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
            <Grid container>
              <Grid item>
                <FormControlLabel
                  control={
                    <Radio
                      color='secondary'
                      size='small'
                      checked={selectedTypeOfSearch === "country"}
                      onChange={handleRadioSearchChange}
                      value='country'
                      name='radio-buttons'
                      inputProps={{ "aria-label": "COUNTRY" }}
                    />
                  }
                  label='Country'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Radio
                      color='secondary'
                      size='small'
                      checked={selectedTypeOfSearch === "city"}
                      onChange={handleRadioSearchChange}
                      value='city'
                      name='radio-buttons'
                      inputProps={{ "aria-label": "CITY" }}
                    />
                  }
                  label='City'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </Collapse>
  );
};

export default SearchCapability;
