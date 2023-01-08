import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "./store/storeHooks";

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
    const fetchedItems = [];
    for (let item in newTravelItems) {
      fetchedItems.push({
        ...newTravelItems[item],
        id: item,
      });
    }
    itemsElements = fetchedItems.map((item) => (
      <p key={item.id}>{item.itemName}</p>
    ));
    console.log("render data");
  }
  if (isLoading) {
    itemsElements = <p>loading...</p>;
    console.log("loading data");
  }
  if (isError) {
    console.log(isError);
    itemsElements = <p>oops! something went wrong</p>;
    console.log("there is an error");
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
        <Box>{itemsElements}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
