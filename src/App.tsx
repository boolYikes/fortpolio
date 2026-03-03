import { ThemeProvider, CssBaseline } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import AppRouter from './app/router/AppRouter'
import { ProjectProvider } from './app/store/ProjectContext'
import { getTheme } from './app/theme/theme'
import React from 'react'

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () => getTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProjectProvider>
        <AppRouter />
      </ProjectProvider>
    </ThemeProvider>
  )
}
