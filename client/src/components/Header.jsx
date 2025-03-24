import React from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                    
        >
            <Box
                sx={{
                    height: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 5,
                    bgcolor: 'background.default',
                }}
            >
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h3" gutterBottom>
                        Assemble Nerd Warriors!
                    </Typography>
                    <Typography variant="body1">
                        Let the problem-solving and innovation begin! 🛠️✨
                    </Typography>
                </Box>
                <Box
                    component="img"
                    src="../src/assets/nope.jpg"
                    alt="Still not getting it"
                    sx={{
                        width: '65%',
                        height: 'auto',
                        borderRadius: 2,
                        boxShadow: 3,
                        maskImage: `
                            linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),  
                            linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),  
                            linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),  
                            linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)`,
                        WebkitMaskImage: `
                            linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),  
                            linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),  
                            linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),  
                            linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)`,
                        maskComposite: "intersect", // Ensures all fades blend together
                        WebkitMaskComposite: "destination-in", 
                    }}
                />
            </Box>
        </motion.div>
    )
}

export default Header