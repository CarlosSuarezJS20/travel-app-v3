import React, { useCallback, useState } from "react";
import {
  Rating,
  Grid,
  Box,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  ClickAwayListener,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../store/storeHooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// Helper functions:
import { getRatingStatsForCard } from "../../utils/ratingHelperFunctions";
import RatingToolTip from "./ratingToolTip";

import theme from "../../../theme";

const CustomeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
  },
}));

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
    <ClickAwayListener onClickAway={toolTipCloseHandler}>
      <Box>
        <CustomeTooltip
          open={isOpen}
          onClose={toolTipCloseHandler}
          disableFocusListener
          disableHoverListener
          title={
            <RatingToolTip itemId={itemId} closeToolTip={toolTipCloseHandler} />
          }
          arrow
          placement='bottom'>
          <Box sx={{ cursor: "pointer" }}>
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
                <IconButton
                  sx={{ padding: "0" }}
                  onClick={isOpen ? toolTipCloseHandler : toolTipOpenHandler}>
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
        </CustomeTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default ItemRating;
