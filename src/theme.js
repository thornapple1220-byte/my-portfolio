import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:         '#4A7FD4',
      light:        '#A8C4E4',
      dark:         '#3567C4',
      contrastText: '#ffffff',
    },
    secondary: {
      main:         '#F5C842',
      light:        '#FFD966',
      dark:         '#D4A820',
      contrastText: '#111111',
    },
    background: {
      default: '#ffffff',
      paper:   '#ffffff',
    },
    text: {
      primary:   '#111111',
      secondary: '#888888',
      disabled:  '#BBBBBB',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem',  fontWeight: 700 },
    h2: { fontSize: '2rem',    fontWeight: 700 },
    h3: { fontSize: '1.5rem',  fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem',     lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
  spacing: 8,
});

export default theme;
