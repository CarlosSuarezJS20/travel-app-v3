import React from "react";
import { Paper, Typography, useMediaQuery } from "@mui/material";

import { makeStyles } from "@mui/styles";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({}));

interface PropsTravelItem {
  category: string;
  itemName: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: number;
}

const SingleTravelItem: React.FC<PropsTravelItem> = ({
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
        padding: theme.spacing(1),
      }}>
      <img
        src={image}
        style={{ height: "350px", width: "100%", objectFit: "cover" }}
      />
      <Typography>{category}</Typography>
      <Typography>{itemName}</Typography>
      <Typography>{country}</Typography>
      <Typography>{city}</Typography>
      <Typography>{description.slice(0, 50)}...</Typography>
      <Typography>{price}</Typography>
    </Paper>
  );
};

export default SingleTravelItem;
