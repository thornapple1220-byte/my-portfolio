import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:         '#FF2D55',
      light:        '#FF6B8A',
      dark:         '#E0002E',
      contrastText: '#ffffff',
    },
    secondary: {
      main:         '#0A1628',
      light:        '#1B3870',
      dark:         '#060E20',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper:   '#ffffff',
    },
    text: {
      primary:   '#222222',
      secondary: '#666666',
      disabled:  '#999999',
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
