import React, { useEffect } from "react";
import { Box, Typography, Collapse, Grid, useMediaQuery } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useGetTravelItemsQuery } from "../../../store/features/travelItemsSlice/traveltems";
import { useRequestAllAverageRatingsQuery } from "../../../store/features/ratingsSlice/ratings";

import { useAppSelector, useAppDispatch } from "../../../store/storeHooks";
import { fetchItemsRatingFromApi } from "../../../store/reducers/ratingItemsReducer";

import SingleTravelItem from "../singleTravelItem/SingletravelItem";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({}));

interface PropsItemsBox {
  isSearchBoxOpen: boolean;
}

const ItemsBox: React.FC<PropsItemsBox> = ({ isSearchBoxOpen }) => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const searchFeatureItemsStateBody = useAppSelector(
    (state) => state.searchFeatureReducer.searchBody
  );
  const { data, isError, isLoading } = useGetTravelItemsQuery(
    searchFeatureItemsStateBody
  );
  const {
    data: ratings,
    isError: isRatingsReqError,
    isLoading: isRatingsReqLoading,
  } = useRequestAllAverageRatingsQuery();

  useEffect(() => {
    if (data && ratings) {
      dispatch(fetchItemsRatingFromApi(ratings!));
    }
  }, [data, ratings, dispatch]);

  let travelItemsElements;

  if (data) {
    // requesting for ratings only if the items exist
    travelItemsElements = data.map((item) => (
      <Grid sm={4} md={2.4} item key={item.id}>
        <SingleTravelItem
          id={item.id}
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
        <Box sx={{ height: "70px" }} />
      </Collapse>
      {isLoading || isRatingsReqLoading ? (
        <Typography>is Loading....</Typography>
      ) : isError || isRatingsReqError ? (
        <Typography>there is an error!</Typography>
      ) : (
        <Grid
          paddingTop={theme.spacing(1)}
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
