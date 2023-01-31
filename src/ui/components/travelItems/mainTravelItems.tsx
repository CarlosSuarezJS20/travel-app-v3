import React from "react";
import { Box, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useGetTravelItemsQuery } from "../../../store/features/travelItemsSlice/traveltems";

import { useAppSelector } from "../../../store/storeHooks";

const useStyles = makeStyles(() => ({}));

const ItemsBox: React.FC = () => {
  const searchFeatureItemsStateBody = useAppSelector(
    (state) => state.searchFeatureReducer.searchBody
  );
  const { data, isError, isLoading } = useGetTravelItemsQuery(
    searchFeatureItemsStateBody
  );

  let travelItemsElements;

  if (data) {
    travelItemsElements = data.map((item) => (
      <Typography key={item.id}>{item.itemName}</Typography>
    ));
  }

  return (
    <Box marginTop={9}>
      {isLoading ? (
        <Typography>is Loading....</Typography>
      ) : isError ? (
        <Typography>there is an error!</Typography>
      ) : (
        travelItemsElements
      )}
    </Box>
  );
};

export default ItemsBox;
