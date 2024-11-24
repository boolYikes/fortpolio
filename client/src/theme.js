import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu, Arial, sans-serif',
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#a962c9',
        },
        secondary: {
            main: '#8cd6a7',
        },
    },
})

export default theme;