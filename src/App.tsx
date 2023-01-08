import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";

import { ThemeProvider } from "@mui/material/styles";
import { Input, Box, Button } from "@mui/material";

// components for UI
import Header from "./ui/components/navigation/header";

// authentication:
import { useLoginMutation } from "./store/apis/authApi";
import type { LoginRequest } from "./store/apis/authApi";
import {
  logIn,
  setUserCredentials,
  autheticationReqError,
} from "./store/reducers/authenticationReducer";

// items
import { useGetTravelItemsQuery } from "./store/apis/itemsApi";

import theme from "./theme";

const App = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // authentication hook http req
  const [login, { loading }] = useLoginMutation();
  const authenticationState = useAppSelector(
    (state) => state.autheticationReducer
  );
  const dispatch = useAppDispatch();

  const {
    data: newTravelItems,
    isError,
    isLoading,
    isSuccess,
  } = useGetTravelItemsQuery(null);

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
      const user = await login(requestBody).unwrap();
      dispatch(setUserCredentials(user));
      dispatch(logIn());
    } catch (err) {
      dispatch(autheticationReqError(err));
    }
  };

  let itemsElements;

  if (isSuccess) {
    itemsElements = newTravelItems.map((item) => (
      <p key={item.id}>{item.itemName}</p>
    ));
  }
  if (isLoading) {
    itemsElements = <p>loading...</p>;
  }
  if (isError) {
    console.log(isError);
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
          {loading ? (
            <p>loading...</p>
          ) : authenticationState.isAuthenticated ? (
            <p>you are logged in</p>
          ) : authenticationState.authenticationReqError ? (
            <p>Opps! Something went wrong</p>
          ) : null}
        </Box>
        <Box>{itemsElements}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
