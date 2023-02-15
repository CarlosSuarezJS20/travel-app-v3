import React from "react";
import { Paper, Typography, Grid, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ItemRating from "../rating/rating";

import { makeStyles } from "@mui/styles";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({}));

interface PropsTravelItem {
  id: string;
  category: string;
  itemName: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: number;
}

const SingleTravelItem: React.FC<PropsTravelItem> = ({
  id,
  category,
  itemName,
  country,
  city,
  image,
  description,
  price,
}) => {
  return (
    <Paper
      sx={{
        width: "100%",
        padding: theme.spacing(0.5),
        borderRadius: "5px",
      }}>
      <Grid container direction='column'>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <ItemRating itemId={id} />
          </Grid>
          <Grid item>
            <IconButton color='secondary'>
              <MoreVertIcon fontSize='medium' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <img
        draggable={false}
        src={image}
        style={{ height: "350px", width: "100%", objectFit: "cover" }}
      />
      <Typography>{category}</Typography>
      <Typography>{itemName.slice(0, 20)}...</Typography>
      <Typography>{country}</Typography>
      <Typography>{city}</Typography>
      <Typography height='2em'>{description.slice(0, 50)}...</Typography>
      <Typography>Price: {price}</Typography>
    </Paper>
  );
};

export default SingleTravelItem;
