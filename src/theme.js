import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:         '#7B68EE',
      light:        '#9D8FF2',
      dark:         '#5B4FCF',
      contrastText: '#ffffff',
    },
    secondary: {
      main:         '#5B4FCF',
      light:        '#7B68EE',
      dark:         '#3D2FB0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper:   '#ffffff',
    },
    text: {
      primary:   '#2D2D2D',
      secondary: '#888888',
      disabled:  '#AAAAAA',
    },
  },
  typography: {
    fontFamily: '"Pretendard Variable", "Pretendard", -apple-system, sans-serif',
    h1: { fontSize: '2.5rem',  fontWeight: 700 },
    h2: { fontSize: '2rem',    fontWeight: 700 },
    h3: { fontSize: '1.5rem',  fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem',     lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
  spacing: 8,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
        }),
      },
    },
  },
});

export default theme;
