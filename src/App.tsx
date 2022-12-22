import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography>Travel-app-V3 take 2</Typography>
        <Button variant='contained' color='primary'>
          Let's start
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
