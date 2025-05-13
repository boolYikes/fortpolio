import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const Intermission = () => {
    return (
        <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                    
        >
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
        </motion.div>
    )
}

export default Intermission