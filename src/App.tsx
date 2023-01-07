import { ChangeEvent, useState, useEffect } from "react";
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

//items
import { getTravelItems } from "./store/reducers/getItemsReducer";

import theme from "./theme";

const App = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // authentication hook http req
  const [login, { loading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  // state
  const { reqStatus, error, travelItems } = useAppSelector(
    (state) => state.getItemsReducer
  );
  const { authenticationReqError } = useAppSelector(
    (state) => state.autheticationReducer
  );

  useEffect(() => {
    if (reqStatus === "idle") {
      dispatch(getTravelItems());
    }
  }, [reqStatus, dispatch]);

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
        {loading ? (
          <Box>LOADING</Box>
        ) : authenticationReqError ? (
          <p>Something went wrong!</p>
        ) : null}
      </Box>
      <Box>{travelItemsElements}</Box>
    </ThemeProvider>
  );
};

export default App;
