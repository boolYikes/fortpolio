import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { LinkedIn } from '@mui/icons-material'
import DiscordIcon from './Icons/DiscordIcon'

const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'primary.dark',
                color: 'common.white',
            }}
        >
            <Typography>
                <Link href='#me' color='inherit' underline='hover'>
                    Me
                </Link>
                {' / '}
                <Link href='#stacks' color='inherit' underline='hover'>
                    Stacks
                </Link>
                {' / '}
                <Link href='#works' color='inherit' underline='hover'>
                    Works
                </Link>
                {' / '}
                <Link href='#contact' color='inherit' underline='hover'>
                    Contact
                </Link>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Link href='https://github.com/boolYikes' target='_blank' color='inherit'>
                    <GitHub />
                </Link>
                <Link href='https://www.linkedin.com/in/dee-h-seon-1246942a8/' target='_blank' color='inherit'>
                    <LinkedIn />
                </Link>
                <Link href='https://discord.com/channels/1022048812447047750/1312732960969195631' target='_blank' color='inherit'>
                    <DiscordIcon />
                </Link>
            </Box>
        </Box>
    )
}

export default Footer