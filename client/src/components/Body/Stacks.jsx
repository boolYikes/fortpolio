import { motion } from 'framer-motion'
import { Box, Typography, Grid2 } from '@mui/material'

// these are placeholder icons
// const techStacks = [
//     { icon: '🎁', description: 'Placeholder' },
//     { icon: '🎍', description: 'Placeholder' },
//     { icon: '🎇', description: 'Placeholder' },
//     { icon: '🎄', description: 'Placeholder' },
// ]

const Stacks = ({ techStacks }) => {
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
                    p: 4,
                    bgcolor: 'background.default'
                }}
            >
                <Grid2 container spacing={2} sx={{ width: '80%' }}>
                    {techStacks.map((stack, index) => (
                        /** in Grid2, item prop is implicit */
                        <Grid2
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                                alignItems: 'center',
                                bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main',
                                color: index % 2 === 0 ? 'common.white' : 'common.black',
                                p: 1,
                                borderRadius: 1,
                                boxShadow: 3,
                            }}
                        >
                            <Typography variant='body1' sx={{ mr: index % 2 === 0 ? 2 : 0, ml: index % 2 === 0 ? 0 : 2 }}>
                                {stack.icon ? stack.icon : "😁"}
                            </Typography>
                            <Typography variant='body2'>{stack.title}</Typography>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </motion.div>
    )
}

export default Stacks