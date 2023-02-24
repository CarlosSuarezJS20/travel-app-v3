import React, { useCallback, useState } from "react";
import {
  Rating,
  Grid,
  Box,
  Typography,
  Tooltip,
  ClickAwayListener,
  IconButton,
} from "@mui/material";
import { useAppSelector } from "../../../store/storeHooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// Helper functions:
import { getRatingStatsForCard } from "../../utils/ratingHelperFunctions";
import RatingToolTip from "./ratingToolTip";

import { makeStyles } from "@mui/styles";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({}));

const ItemRating: React.FC<{ itemId: string }> = ({ itemId }) => {
  const ratings = useAppSelector((state) => state.ratings.ratings);
  const [isOpen, setIsOpen] = React.useState(false);

  const toolTipOpenHandler = () => {
    setIsOpen(true);
  };

  const toolTipCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      open={isOpen}
      disableFocusListener
      disableHoverListener
      sx={{ background: "white" }}
      title={
        <RatingToolTip itemId={itemId} closeToolTip={toolTipCloseHandler} />
      }
      arrow
      placement='bottom'>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={isOpen ? toolTipCloseHandler : toolTipOpenHandler}>
        <Grid container justifyContent='flex-start' alignItems='flex-end'>
          <Grid item>
            <Rating
              size='small'
              sx={{ paddingTop: "8px" }}
              name='read-only'
              value={getRatingStatsForCard(ratings, itemId).avgRating}
              readOnly
            />
          </Grid>
          <Grid item>
            <IconButton sx={{ padding: "0" }}>
              {isOpen ? (
                <HighlightOffIcon
                  sx={{ color: theme.palette.common.purple }}
                  fontSize='medium'
                />
              ) : (
                <ExpandMoreIcon fontSize='medium' />
              )}
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              sx={{ fontSize: "0.9em", paddingLeft: "0.5em" }}
              component='legend'>
              {getRatingStatsForCard(ratings, itemId).numUsers}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Tooltip>
  );
};

export default ItemRating;
