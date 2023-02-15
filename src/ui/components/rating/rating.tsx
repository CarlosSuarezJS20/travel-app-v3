import React, { useEffect, useState } from "react";
import { Paper, Rating, Grid, Typography } from "@mui/material";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({}));

const ItemRating: React.FC<{ itemId: string }> = ({ itemId }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(itemId);
  }, [itemId]);

  return (
    <Grid container>
      <Grid item>
        <Rating
          sx={{ paddingTop: "8px" }}
          name='read-only'
          value={3}
          readOnly
        />
      </Grid>
      <Grid item>
        <Typography sx={{ paddingTop: "8px" }} component='legend'>
          by 10 travellers
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ItemRating;
