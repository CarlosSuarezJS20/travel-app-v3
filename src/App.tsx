import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";

import { ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

// components for UI
import Header from "./ui/components/navigation/header";

// authentication:
import { useLoginMutation } from "./store/features/apis/authApi";
import type { LoginRequest } from "./store/features/apis/authApi";
import {
  logIn,
  setUserCredentials,
} from "./store/reducers/authenticationReducer";

// items
import {
  useGetTravelItemsQuery,
  selectAllTravelItems,
  useAddNewTravelItemMutation,
} from "./store/features/travelItemsSlices/traveltems";

import theme from "./theme";

const App = () => {
  const [authenticationRejectReason, setAutheticationRejectReason] =
    useState("");
  // authentication hook http req
  const [login, data] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { isError, isLoading, isSuccess } = useGetTravelItemsQuery();
  const [addNewItem, { isLoading: addItemLoading, isError: addItemReqError }] =
    useAddNewTravelItemMutation();

  // const travelItems = useAppSelector(selectAllTravelItems);
  const travelItems = useAppSelector(selectAllTravelItems);
  const userAuthenticationCredentialsToken = useAppSelector(
    (state) => state.autheticationReducer.userInfo
  );

  const handlesAddNewClick = () => {
    if (!userAuthenticationCredentialsToken) {
      return;
    }
    const { localId, idToken } = userAuthenticationCredentialsToken;
    const testItem = {
      category: "Food & drinks",
      itemName: "Guiness pint in Dublin NEW",
      country: "IRELAND",
      city: "DUBLIN",
      image:
        "https://firebasestorage.googleapis.com/v0/b/budget-world-reactjs.appspot.com/o/images%2Fguinees.jpeg?alt=media&token=82ad89b8-01e0-4d8d-851f-6ee438562002",
      description: "New post",
      price: 7,
      userId: localId!,
      token: idToken!,
    };
    addNewItem(testItem);
  };

  const handlesOnClick = async () => {
    const requestBody: LoginRequest = {
      email: "travelup@testing.com",
      password: "travelup2023",
      returnSecureToken: true,
    };

    try {
      const { localId, idToken } = await login(requestBody).unwrap();
      // unwrap() is enabling us to reject or succeed the request
      dispatch(setUserCredentials({ localId, idToken }));
      dispatch(logIn());
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        setAutheticationRejectReason(err);
      }
      setAutheticationRejectReason(err);
    }
  };

  let itemsElements;

  if (isSuccess) {
    console.log(travelItems);
    itemsElements = travelItems.map((item) => (
      <Box key={item.id}>
        <p>{item.itemName}</p>
        <p style={{ marginBottom: "5px" }}>{item.country}</p>
      </Box>
    ));
  }
  if (isLoading) {
    itemsElements = <p>loading...</p>;
  }
  if (isError) {
    itemsElements = <p>oops! something went wrong</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box sx={{ margin: "100px", "& > :not(style)": { m: 2 } }}>
        <Button
          variant='contained'
          onClick={() => {
            handlesOnClick();
          }}>
          Log in
        </Button>
        <Box>
          {data.isLoading ? (
            <p>Loading</p>
          ) : data.isSuccess ? (
            <p>you are logged in</p>
          ) : data.isError ? (
            <p>
              {authenticationRejectReason === "FETCH_ERROR"
                ? "Ops Something went wrong"
                : authenticationRejectReason}
            </p>
          ) : null}
        </Box>
        <Box>
          <Button
            variant='contained'
            onClick={() => {
              handlesAddNewClick();
            }}>
            add
          </Button>
        </Box>
        <Box>
          {addItemLoading ? (
            <p>adding your item...</p>
          ) : addItemReqError ? (
            <p>couldn't add item this time</p>
          ) : null}
        </Box>
        <Box>{itemsElements}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
