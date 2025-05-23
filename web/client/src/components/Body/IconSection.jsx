import { motion } from 'framer-motion'
import { Box, Grid2, Typography } from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

const icons = [
    { icon: <EmojiEmotionsIcon />, description: 'Trait 1'},
    { icon: <EmojiEmotionsIcon />, description: 'Trait 2'},
    { icon: <EmojiEmotionsIcon />, description: 'Trait 3'},
    { icon: <EmojiEmotionsIcon />, description: 'Trait 4'},
    { icon: <EmojiEmotionsIcon />, description: 'Trait 5'},
    { icon: <EmojiEmotionsIcon />, description: 'Trait 6'},
]

const IconSection = () => {
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
                    bgcolor: 'background.default',
                    p: 4,
                }}
            >
                <Grid2 container spacing={4} sx={{ width: '80%', justifyContent: 'space-between' }}>
                    {icons.map((item ,index) => (
                        <Grid2
                            key={index}
                            xs={12} sm={6} md={4}
                            textAlign='center'
                        >
                            <Box>{item.icon}</Box>
                            <Typography>{item.description}</Typography>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </motion.div>
    )
}

export default IconSection