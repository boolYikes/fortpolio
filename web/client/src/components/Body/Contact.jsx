import { motion } from 'framer-motion'
import { Box, Typography, TextField, Button } from '@mui/material'

const Contact = () => {
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
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'Background.default',
                    p: 4
                }}
            >
                <Typography variant='h4' textAlign='center' gutterBottom>
                    Contact Me
                </Typography>
                <Box
                    component='form'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: 500,
                        gap: 2
                    }}
                >
                    <TextField
                        label='Your Email'
                        variant='outlined'
                        fullWidth
                        required
                        type='email'
                    />
                    <TextField
                        label='Your Message'
                        variant='outlined'
                        fullWidth
                        required
                        multiline
                        rows={4}
                    />
                    <Button variant='contained' color='primary' type='submit'>
                        Submit
                    </Button>
                    <Typography
                        sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}
                    >
                        Dee Henry Seon
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    )
}

export default Contact