import React from "react";
import { Box, Typography, Collapse } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useGetTravelItemsQuery } from "../../../store/features/travelItemsSlice/traveltems";

import { useAppSelector } from "../../../store/storeHooks";

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

  let travelItemsElements;

  if (data) {
    travelItemsElements = data.map((item) => (
      <Typography key={item.id}>{item.itemName}</Typography>
    ));
  }

  return (
    <Box marginTop={9}>
      <Collapse in={isSearchBoxOpen}>
        <Box sx={{ height: "70px" }} />
      </Collapse>
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
