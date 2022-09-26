import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: 'Gotham',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#00C897',
      light: '#00C897',
      dark: '#00C897',
      contrastText: '#fff',
    },
    secondary: {
      main: '#06283D',
    },
    error: {
      main: '#d8372c',
    },
    background: {
      default: '#eeeeee',
      paper: '#ffffff',
    },
    text: {
      primary: '#2a2b2b',
    },
    gray: {
      500: '#262626',
    },
  },
});
