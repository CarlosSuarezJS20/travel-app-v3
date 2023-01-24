import React from "react";
import {
  Toolbar,
  Grid,
  Typography,
  InputBase,
  Button,
  Collapse,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import theme from "../../../theme";

interface PropsSearch {
  isChecked: boolean;
}

const SearchCapability: React.FC<PropsSearch> = ({ isChecked }) => {
  return (
    <Collapse in={isChecked}>
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
