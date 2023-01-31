import { ThemeProvider } from "@mui/material/styles";
// components for UI
import Header from "./ui/components/navigation/header";
import MainTravelItems from "./ui/components/travelItems/mainTravelItems";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <MainTravelItems />
    </ThemeProvider>
  );
};

export default App;
