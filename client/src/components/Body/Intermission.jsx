import { Box, Typography } from '@mui/material'

const Intermission = () => {
    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'primary.main',
                color: 'common.white',
            }}
        >
            <Typography variant='h4' textAlign='center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod.
            </Typography>
        </Box>
    )
}

export default Intermission