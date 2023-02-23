import React from "react";
import { Rating, Grid, Box, Typography, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({}));

const RatingToolTip: React.FC<{ itemId: string; closeToolTip: () => void }> = ({
  itemId,
  closeToolTip,
}) => {
  return (
    <Box>
      <Grid direction='column' container>
        <Grid item>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
              <Typography fontSize='1.2em' fontWeight='bold'>
                Your Rating:
              </Typography>
            </Grid>
            <Grid item>
              <Rating size='small' value={3} readOnly></Rating>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RatingToolTip;
