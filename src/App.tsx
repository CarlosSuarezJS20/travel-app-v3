import React, { ChangeEvent, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Input, Box, Button } from "@mui/material";

// components for UI
import Header from "./ui/components/navigation/header";

import theme from "./theme";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Button variant='contained'>Log in</Button>
      </Box>
    </ThemeProvider>
  );
};

export default App;
