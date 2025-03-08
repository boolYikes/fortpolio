import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Icon from '@mui/icons-material/Person'
import { styled } from '@mui/system' // custom components!
import axios from "axios"

// fudging props validation
const NavBar = () => {
    // states
    const [anchorEl, setAnchorEl] = useState(null)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/api/test")
        .then(resp => setProfile(resp.data))
        .catch(err => console.error("Error: ", err))
    }, [])

    // menu handling
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    // custom components : to be refactored!
    const Div =  styled('div')``
    // why load twice????
    // bc react is in strict mode -> detects side effects -> to use this feature turn on strictmode in main
    console.log(profile[0]['preferred_name'])
    return (
        <AppBar position="static" sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <Icon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {profile[0]["preferred_name"] + " " + profile[0]["middle_name"] + " " + profile[0]["last_name"]}
                    {/* fukin hell man */}
                </Typography>
                <div>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleMenuOpen}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {['Me', 'Stacks', 'Works', 'Contact'].map((menu) => (
                            <MenuItem key={menu} onClick={handleMenuClose}>
                                {menu}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Div sx={{ display: {xd: 'none', md: 'flex' } }}>
                        {['Me', 'Stacks', 'Works', 'Contact'].map((menu) => (
                            <Typography
                                key={menu}
                                variant="body1"
                                sx={{ ml: 2, cursor: 'pointer' }}
                            >
                                {menu}
                            </Typography>
                        ))}
                    </Div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar