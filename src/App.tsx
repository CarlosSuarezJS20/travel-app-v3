import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";

import { ThemeProvider } from "@mui/material/styles";
import { Input, Box, Button } from "@mui/material";

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
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [authenticationRejectReason, setAutheticationRejectReason] =
    useState("");
  const [newTravelItem, setNewTravelItem] = useState({
    itemName: "",
    userId: "",
    token: "",
  });
  // authentication hook http req
  const [login, data] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { isError, isLoading, isSuccess } = useGetTravelItemsQuery();
  const [
    addNewItem,
    { isLoading: addItemLoading, isError: addItemReqError, error },
  ] = useAddNewTravelItemMutation();

  // const travelItems = useAppSelector(selectAllTravelItems);
  const travelItems = useAppSelector(selectAllTravelItems);
  const userAuthenticationCredentialsToken = useAppSelector(
    (state) => state.autheticationReducer.userInfo.idToken
  );

  // useEffect(() => {
  //   // console.log(error);
  // }, [error]);

  // new item
  const onChangeInputAddNewHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTravelItem((prev) => ({
      ...prev,
      itemName: e.target.value,
      userId: "1",
      token: userAuthenticationCredentialsToken!,
    }));
  };

  const handlesAddNewClick = () => {
    if (!userAuthenticationCredentialsToken) {
      return;
    }
    addNewItem(newTravelItem);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesOnClick = async () => {
    const requestBody: LoginRequest = {
      ...credentials,
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
      <p key={item.id}>{item.itemName}</p>
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
        <Input
          id='email'
          type='email'
          value={credentials.email}
          onChange={onChangeInputHandler}
          name='email'
          placeholder='Enter your email'
        />
        <Input
          id='password'
          type='password'
          value={credentials.password}
          onChange={onChangeInputHandler}
          name='password'
          placeholder='Enter your password'
        />
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
          <Input
            id='add new'
            value={newTravelItem.itemName}
            onChange={onChangeInputAddNewHandler}
            name='add new'
            type='text'
            placeholder='add new'
          />
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
