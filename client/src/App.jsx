import React, { useState, useEffect } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Section from './components/Section'
import Navbar from './components/Navbar'

const App = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // adjustable : check what value sm stands for
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets css for consistency */}
      <Box sx={{ fontFamily: 'Ubuntu' }}>
        <Navbar />
        {/* offset to prevent hidden content : this is ugly. gotta integrate it to the bg*/}
        <Toolbar />
        <Section bgImage='/src/assets/images/section_bg.webp'>
          <Typography 
            variant={isMobile ? 'h4' : 'h2'}
            component='h1' 
            align='center' 
            color='#121212'
            sx={{
              WebkitTextStroke: '1px #8cd6a7',
              fontWeight: 'bold',
            }}
          >
            I want it transparent and I want it now.
          </Typography>
        </Section>

        {[1, 2, 3 ,4].map((section) => (
          <Section key={section}>
            <Typography variant='h4' component='h2' gutterBottom>
              Section {section} test
            </Typography>
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. 
              Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula.
            </Typography>
          </Section>
        ))}
      </Box>
    </ThemeProvider>
    
  )
    
}

export default App
