import React from "react";

import { ThemeProvider } from "@mui/material/styles";

// components for UI
import ToolBar from "./ui/components/navigation/appbar";

import theme from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToolBar />
    </ThemeProvider>
  );
};

export default App;
