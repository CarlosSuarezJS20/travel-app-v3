import React from "react";
import { Box, Typography, Collapse, Grid, useMediaQuery } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useGetTravelItemsQuery } from "../../../store/features/travelItemsSlice/traveltems";

import { useAppSelector } from "../../../store/storeHooks";

import SingleTravelItem from "../singleTravelItem/SingletravelItem";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({}));

interface PropsItemsBox {
  isSearchBoxOpen: boolean;
}

const ItemsBox: React.FC<PropsItemsBox> = ({ isSearchBoxOpen }) => {
  const searchFeatureItemsStateBody = useAppSelector(
    (state) => state.searchFeatureReducer.searchBody
  );
  const { data, isError, isLoading } = useGetTravelItemsQuery(
    searchFeatureItemsStateBody
  );
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  let travelItemsElements;

  if (data) {
    travelItemsElements = data.map((item) => (
      <Grid sm={4} md={2} item key={item.id}>
        <SingleTravelItem
          category={item.category}
          itemName={item.itemName}
          country={item.country}
          city={item.city}
          image={item.image}
          description={item.description}
          price={item.price}
        />
      </Grid>
    ));
  }

  return (
    <Box marginTop={8}>
      <Collapse in={isSearchBoxOpen}>
        <Box sx={{ height: "65px" }} />
      </Collapse>
      {isLoading ? (
        <Typography>is Loading....</Typography>
      ) : isError ? (
        <Typography>there is an error!</Typography>
      ) : (
        <Grid
          spacing={{ sm: 1 }}
          container
          columns={{ sm: 8, md: 12 }}
          direction={matches ? "column" : "row"}>
          {travelItemsElements}
        </Grid>
      )}
    </Box>
  );
};

export default ItemsBox;
