import { Box, Typography, Button } from '@mui/material'

// placeholders
const projects = [
    { image: '../src/assets/prog.jpg', description: 'Project 1 desc.', link: '#' },
    { image: '../src/assets/prog.jpg', description: 'Project 1 desc.', link: '#' },
    { image: '../src/assets/prog.jpg', description: 'Project 1 desc.', link: '#' },
]

const Slider = () => {
    return (
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
            <Box sx={{ width: '80%' }}>
                <Typography variant='v4' textAlign='center' gutterBottom>
                    Recent ones
                </Typography>
                {/* this will be replaced with a carousel component */}
                <div>
                    {projects.map((project, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                '&:hover img': { filter: 'blur(5px)' },
                            }}
                        >
                            <Box
                                component='img'
                                src={project.image}
                                alt={`Project ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    transition: 'filter 0.3s ease',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'common.white',
                                    textAlign: 'center',
                                    bgcolor: 'rgba(0,0,0,0.6)',
                                    opacity: 0,
                                    '&:hover': { opacity: 1 },
                                    transition: 'opacity 0.3s ease',
                                }}
                            >
                                <Typography variant='h6'>{project.description}</Typography>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    sx={{ mt: 2}}
                                    href={project.link}
                                >
                                    Get a closer look
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </div>
            </Box>
        </Box>
    )
}

export default Slider