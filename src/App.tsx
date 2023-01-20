import { useState } from "react";
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
  useAddNewTravelItemMutation,
  useEditTravelItemMutation,
  useDeleteItemMutation,
} from "./store/features/travelItemsSlices/traveltems";

import theme from "./theme";

const App = () => {
  const [authenticationRejectReason, setAutheticationRejectReason] =
    useState("");
  // authentication hook http req
  const [login, data] = useLoginMutation();
  const dispatch = useAppDispatch();
  const {
    data: travelItems,
    isError,
    isLoading,
    isSuccess,
  } = useGetTravelItemsQuery();

  const [deleteItem, { isLoading: deleteReqLoading, isError: deleteReqError }] =
    useDeleteItemMutation();
  const [addNewItem, { isLoading: addItemLoading, isError: addItemReqError }] =
    useAddNewTravelItemMutation();
  const [
    editItemHandler,
    { isLoading: editItemLoading, isError: editReqError },
  ] = useEditTravelItemMutation();

  const userAuthenticationCredentials = useAppSelector(
    (state) => state.autheticationReducer.userInfo
  );

  const handlesAddNewClick = () => {
    const { localId, idToken } = userAuthenticationCredentials;
    const testItem = {
      category: "Food & drinks",
      itemName: "Guiness pint in Dublin NEW II",
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

  const handlesEditClick = () => {
    const { localId, idToken } = userAuthenticationCredentials;
    const testEditItem = {
      id: "-NMEnU4PiXgendNzFvYH",
      category: "Food & drinks",
      itemName: "Guiness pint in Dublin Edit III",
      country: "IRELAND",
      city: "DUBLIN",
      image:
        "https://firebasestorage.googleapis.com/v0/b/budget-world-reactjs.appspot.com/o/images%2Fguinees.jpeg?alt=media&token=82ad89b8-01e0-4d8d-851f-6ee438562002",
      description: "edited post",
      price: 7,
      userId: localId!,
      token: idToken!,
    };
    editItemHandler(testEditItem);
  };

  const handlesDeleteClick = () => {
    deleteItem({
      id: "-NMEnU4PiXgendNzFvYH",
      token: userAuthenticationCredentials.idToken!,
    });
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
          <Button
            variant='contained'
            onClick={() => {
              handlesEditClick();
            }}>
            edit
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              handlesDeleteClick();
            }}>
            delete
          </Button>
        </Box>
        <Box>
          {addItemLoading ? (
            <p>adding your item...</p>
          ) : addItemReqError ? (
            <p>couldn't add item this time</p>
          ) : null}
        </Box>
        <Box>
          {editItemLoading ? (
            <p>editing your item...</p>
          ) : editReqError ? (
            <p>couldn't edit item this time</p>
          ) : null}
        </Box>
        <Box>
          {deleteReqLoading ? (
            <p>deleting your item...</p>
          ) : deleteReqError ? (
            <p>couldn't edit item this time</p>
          ) : null}
        </Box>
        <Box>{itemsElements}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
