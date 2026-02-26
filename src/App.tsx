import AppRouter from './app/router/AppRouter'
import { ProjectProvider } from './app/store/ProjectContext'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './app/theme/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProjectProvider>
        <AppRouter />
      </ProjectProvider>
    </ThemeProvider>
  )
}
