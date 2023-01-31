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
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../../store/storeHooks";
import { searchBody } from "../../../store/reducers/searchFeatureReduce";

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
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeOfSearch, setselectedTypeOfSearch] = useState("country");

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <Grid container gap={2} justifyContent='center' alignItems='center'>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
