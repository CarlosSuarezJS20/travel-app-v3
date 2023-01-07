import React, { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";

import { ThemeProvider } from "@mui/material/styles";
import { Input, Box, Button, Switch } from "@mui/material";

// components for UI
import Header from "./ui/components/navigation/header";

// authentication:
import { useLoginMutation } from "./store/apis/authApi";
import type { LoginRequest } from "./store/apis/authApi";
import {
  logIn,
  setUserCredentials,
} from "./store/reducers/authenticationReducer";

//items
import { getTravelItems } from "./store/reducers/getItemsReducer";

import theme from "./theme";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // authentication hook http req
  const [login, { loading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  // state
  const { reqStatus, error, travelItems } = useAppSelector(
    (state) => state.getItemsReducer
  );

  useEffect(() => {
    if (reqStatus === "idle") {
      dispatch(getTravelItems());
    }
  }, [reqStatus, dispatch]);

  const onChangeInputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    inputName?: string
  ) => {
    switch (inputName) {
      case "password":
        setPassword(e.target.value);
        break;
      default:
        setEmail(e.target.value);
    }
  };

  const handlesOnClick = async () => {
    const requestBody: LoginRequest = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    try {
      const user = await login(requestBody).unwrap();
      dispatch(setUserCredentials(user));
      console.log("here dispaching");
      dispatch(logIn());
    } catch (err) {
      dispatch(logIn());
    }
  };

  let travelItemsElements;

  switch (reqStatus) {
    case "pending":
      travelItemsElements = <p>Loading</p>;
      break;
    case "succeeded":
      travelItemsElements = travelItems.map((item, i: number) => (
        <p key={i}>{item.itemName}</p>
      ));
      break;
    case "failed":
      travelItemsElements = <p>{error}</p>;
      break;
    default:
      travelItemsElements = null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box sx={{ margin: "100px", "& > :not(style)": { m: 2 } }}>
        <Input onChange={onChangeInputHandler} placeholder='email' />
        <Input
          placeholder='password'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeInputHandler(e, "password");
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            handlesOnClick();
          }}>
          Log in
        </Button>
        {loading && <Box>LOADING</Box>}
      </Box>
      <Box>{travelItemsElements}</Box>
    </ThemeProvider>
  );
};

export default App;
