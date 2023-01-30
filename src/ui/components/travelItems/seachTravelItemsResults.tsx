import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useGetTravelItemsQuery } from "../../../store/features/travelItemsSlice/traveltems";
import {
  useSearchTravelItemsByCityQuery,
  useSearchTravelItemsByCountryQuery,
} from "../../../store/features/searchItemsSlice/searchItems";

import { useAppSelector } from "../../../store/storeHooks";

const useStyles = makeStyles(() => ({}));

interface travelItem {
  id: string;
  category: string;
  itemName: string;
  country: string;
  city: string;
  image: string;
  description: string;
  price: number;
}

const SearchItemsBox: React.FC = () => {
  const searchFeatureItemsStateBody = useAppSelector(
    (state) => state.searchFeatureReducer.searchBody
  );

  const {
    data: countryData,
    isError: countryDataError,
    isLoading: countrDataIsLoading,
  } = useSearchTravelItemsByCountryQuery(
    searchFeatureItemsStateBody.searchTerm
  );

  const {
    data: cityData,
    isError: cityDataError,
    isLoading: cityDataIsLoading,
  } = useSearchTravelItemsByCountryQuery(
    searchFeatureItemsStateBody.searchTerm
  );

  let searchResultsTravelItemsElements;

  if (
    searchFeatureItemsStateBody.typeOfSearch === "country" &&
    searchFeatureItemsStateBody.searchTerm.length > 0 &&
    countryData
  ) {
    searchResultsTravelItemsElements = countryData.map((item) => (
      <Typography key={item.id}>{item.itemName}</Typography>
    ));
  }

  if (
    searchFeatureItemsStateBody.typeOfSearch === "city" &&
    searchFeatureItemsStateBody.searchTerm.length > 0 &&
    cityData
  ) {
    searchResultsTravelItemsElements = cityData.map((item) => (
      <Typography key={item.id}>{item.itemName}</Typography>
    ));
  }

  return (
    <Box marginTop={9}>
      {countrDataIsLoading || cityDataIsLoading ? (
        <Typography>is Loading....</Typography>
      ) : countryDataError || cityDataError ? (
        <Typography>there is an error!</Typography>
      ) : (
        searchResultsTravelItemsElements
      )}
    </Box>
  );
};

export default SearchItemsBox;
