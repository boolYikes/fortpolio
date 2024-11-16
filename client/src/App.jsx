import React, { useState, useEffect } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Section from './components/Section'
import HeaderSection from './components/HeaderSection'
import Navbar from './components/Navbar'
import headerbg from '/src/assets/images/section_bg.webp'

const App = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // adjustable : check what value sm stands for
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets css for consistency */}
      <Box sx={{ fontFamily: 'Ubuntu' }}>
        <Navbar />
        {/* offset to prevent hidden content : this is ugly. gotta integrate it to the bg*/}
        <Toolbar />
        <Section bgimage="/src/assets/images/section_bg.webp">
          <Typography 
            variant={isMobile ? 'h4' : 'h2'}
            component='h1' 
            align='left' 
            color='rgb(102, 218, 239)'
            sx={{
            WebkitTextStroke: '1px rgb(0, 0, 0)',
            fontWeight: 'bold',
            fontSize: '5em'
            }}
          >
            I WANT IT<br/> TRANSPARENT<br/> AND<br/> I WANT IT<br/> NOW.<br/>
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
