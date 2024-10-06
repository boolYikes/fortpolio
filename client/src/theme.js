import { createTheme } from '@mui/material/styles'
import UbuntuTTF from './assets/fonts/Ubuntu-Regular.ttf'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8cd6a7',
        },
        secondary: {
            main: '#a962c9',
        },
        error: {
            main: '#e22121',
        },
    },
    typography: {
        fontFamily: 'Ubuntu, Roboto',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Ubuntu';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('Ubuntu'), local('Ubuntu-Regular'), url(${UbuntuTTF}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
            `,
        },
    },
})

export default theme