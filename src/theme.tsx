import { createTheme } from "@mui/material/styles";

import "@mui/material/styles";
import "@mui/material/styles/createPalette";

enum themePalette {
  ARCPURPLE = "#a625b9",
  ARCBLACK = "#000000",
  ARCGREY = "#868686",
  ARCWHITE = "#fffefa",
}

enum typographyFonts {}
//   H3 = 300,

// adding a field

declare module "@mui/material/styles" {
  interface TypographyVariants {
    logo: React.CSSProperties;
    genericBtn: React.CSSProperties;
    // tab: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // tab?: React.CSSProperties;
    logo?: React.CSSProperties;
    genericBtn?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    // tab: true;
    logo: true;
    genericBtn: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    grey: string;
    black: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: themePalette.ARCWHITE,
    },
    secondary: {
      main: themePalette.ARCPURPLE,
    },
    common: {
      grey: themePalette.ARCGREY,
      black: themePalette.ARCBLACK,
    },
  },
  typography: {
    logo: {
      fontSize: 23,
      fontWeight: "bold",
      padding: "0.2em 0.3em",
      border: "1px solid #868686",
      borderRadius: "25px",
    },
    genericBtn: {
      textTransform: "capitalize",
      height: "30px",
      fontWeight: "bold",
      background: themePalette.ARCPURPLE,
      color: themePalette.ARCWHITE,
    },
  },
});

export default theme;
