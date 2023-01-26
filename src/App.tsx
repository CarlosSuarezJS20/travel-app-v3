import { ThemeProvider } from "@mui/material/styles";

// components for UI
import Header from "./ui/components/navigation/header";

import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>test</div>
    </ThemeProvider>
  );
};

export default App;
