import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFfamily: "Poppins, sans-serif",
  },
  palette: {
    type: "light",
    primary: {
      main: "#1C6758",
      light: "#1C6758",
      dark: "#1C6758",
      contrastText: "#fff",
    },
    secondary: {
      main: "#06283D",
    },
    error: {
      main: "#d8372c",
    },
    background: {
      default: "#eeeeee",
      paper: "#ffffff",
    },
    text: {
      primary: "#2a2b2b",
    },
    gray: {
      500: "#262626",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  overrides: {
    MuiFormControl: {
      root: {
        height: "40px",
      },
    },
    MuiInputBase: {
      root: {
        height: "40px",
      },
    },
  },
});
