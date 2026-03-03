import { createTheme } from '@mui/material/styles'

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Ubuntu, sans-serif',
//   },
// })

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    typography: {
      fontFamily: 'Ubuntu, sans-serif',
    },
    palette: {
      mode,
    },
  })
