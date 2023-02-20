import React, { useCallback, useEffect, useState } from "react";
import { Rating, Grid, Box, Typography } from "@mui/material";
import RatingToolTip from "./ratingToolTip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({}));

const ItemRating: React.FC<{ itemId: string }> = ({ itemId }) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [openToolTip, setOpenToolTip] = React.useState(false);

  const anchorElementHandler = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(e.currentTarget);
    setOpenToolTip(true);
  };

  const toolTipRatingCloseHandler = useCallback(() => {
    setAnchorElement(null);
    setOpenToolTip(false);
  }, [anchorElement]);

  return (
    <Box id='toolTip_rating' onMouseOver={anchorElementHandler}>
      <Grid container justifyContent='flex-start' alignItems='flex-end'>
        <Grid item>
          <Rating
            sx={{ paddingTop: "8px" }}
            name='read-only'
            value={3}
            readOnly
          />
        </Grid>
        <Grid item>
          <ExpandMoreIcon />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: "0.7em" }} component='legend'>
            by 10 travellers
          </Typography>
        </Grid>
      </Grid>
      <RatingToolTip
        itemId={itemId}
        handleClose={toolTipRatingCloseHandler}
        anchorElement={anchorElement}
        openMenu={openToolTip}
      />
    </Box>
  );
};

export default ItemRating;
