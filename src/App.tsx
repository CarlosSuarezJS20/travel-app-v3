import React, { ChangeEvent, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Input, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";

// components for UI
import Header from "./ui/components/navigation/header";

// authentication:
import { useLoginMutation } from "./store/apis/authApi";
import type { LoginRequest } from "./store/apis/authApi";
import {
  logIn,
  setUserCredentials,
} from "./store/reducers/authenticationReducer";

import theme from "./theme";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

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
      console.log(err);
      dispatch(logIn());
    }
  };

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
        {isLoading && <Box>LOADING</Box>}
      </Box>
    </ThemeProvider>
  );
};

export default App;
