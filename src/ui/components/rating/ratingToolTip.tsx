import React from "react";
import { Rating, Grid, Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../store/storeHooks";
import { getUserRating } from "../../utils/ratingHelperFunctions";
import StarsIcon from "@mui/icons-material/Stars";

import { makeStyles } from "@mui/styles";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({}));

interface RatingProps {
  itemId: string;
  closeToolTip: () => void;
}

const RatingToolTip: React.FC<RatingProps> = ({ itemId, closeToolTip }) => {
  const ratings = useAppSelector((state) => state.ratings.ratings);
  const userId = "9a9UHQYFtLhQYewSRCn36AeH4tP2";
  const userRating = getUserRating(ratings, itemId, userId);

  return (
    <Box>
      <Grid direction='column' container>
        <Grid item>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item>
              {userRating ? (
                <Typography fontSize='1.2em' fontWeight='bold'>
                  Your rating:
                </Typography>
              ) : (
                <Grid
                  sx={{
                    textDecoration: "underline",
                    "&:hover": { color: theme.palette.common.purple },
                  }}
                  container
                  justifyContent='flex-start'
                  alignItems='center '
                  gap={0.5}
                  onClick={closeToolTip}>
                  <Grid item>
                    <StarsIcon fontSize='small' />
                  </Grid>
                  <Grid item>
                    <Typography fontSize='1em'>Rate this card?</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item sx={{ display: userRating > 0 ? "block" : "none" }}>
              <Rating size='small' value={userRating} readOnly></Rating>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RatingToolTip;
