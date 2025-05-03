import { createTheme } from '@mui/material/styles'

const theme = createTheme({
        typography: {
            fontFamily: 'Ubuntu, Arial, sans-serif',
        },
        palette: {
            mode: 'dark',
            primary: {
                main: 'rgb(61, 164, 128)',
            },
            secondary: {
                main: 'rgb(235, 113, 142)',
            },
        },
    })

export default theme