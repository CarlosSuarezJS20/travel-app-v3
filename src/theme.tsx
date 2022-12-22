import { createTheme } from "@mui/material/styles";

import "@mui/material/styles";
import "@mui/material/styles/createPalette";

enum themePalette {
  ARCPURPLE = "#a625b9",
  ARCGREY = "#868686",
  ARCWHITE = "ffff",
}

enum typographyFonts {}
//   H3 = 300,

// adding a field

declare module "@mui/material/styles" {
  interface TypographyVariants {
    // tab: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // tab?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    // tab: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    grey: string;
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
    },
  },
  typography: {},
});

export default theme;
