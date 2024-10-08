import React from 'react'
import { styled } from '@mui/system'
import { AppBar, Toolbar, Typography, Box, Button, Stack } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'

const NavLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
}))

const Navbar = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // adjustable : check what value sm stands for

    return (
        <AppBar position='fixed' color='transparent' elevation={0}>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1}}>
                    <Stack direction='row' spacing={2}>
                        <Avatar 
                            variant='square'
                            alt='Logo'
                            src='/src/assets/images/D.png'
                            sx={{ width: 50, height: 50}}
                        />
                        <Avatar variant='square' sx={{ width: 50, height: 50, bgcolor: 'inherit', color: 'white'}}>Dee</Avatar>
                    </Stack>
                </Typography>
                {!isMobile && (
                    <NavLinks>
                        <Button color='inherit'>Me</Button>
                        <Button color='inherit'>Stacks</Button>
                        <Button color='inherit'>Works</Button>
                        <Button color='inherit'>Contact</Button>
                    </NavLinks>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar