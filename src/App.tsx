import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";

import { ThemeProvider } from "@mui/material/styles";
import { Input, Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";

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

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // authentication hook http req
  const [login, { loading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // items
  const { isSuccess, isLoading, error } = useQuery("items", () =>
    dispatch(getTravelItems())
  );
  const itemsState = useAppSelector((state) => state.getItemsReducer);

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
        {loading && <Box>LOADING</Box>}
      </Box>
      <Box>
        {isLoading ? (
          <Box>loading...</Box>
        ) : error ? (
          <p>there is an error </p>
        ) : isSuccess ? (
          <Box>
            {itemsState.items.map((item, i: number) => (
              <p key={i}>{item.itemName}</p>
            ))}
          </Box>
        ) : (
          <Box>No data</Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
