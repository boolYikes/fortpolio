import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import Section from './components/Section'
import { Typography } from '@mui/material'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets css for consistency */}
      <Box sx={{ fontFamily: 'Ubuntu' }}>
        <Section bgImage='/src/assets/section_bg.jpg'>
          <Typography variant='h2' component='h1' align='center' color='white'>
            Dee Henry Seon
          </Typography>
        </Section>
      </Box>
    </ThemeProvider>
    
  )
    
}

export default App
