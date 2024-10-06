import React, { useRef, useEffect, useState } from 'react'
import { Box, Typography, Container } from '@mui/material'
import { styled } from '@mui/system'

const StyledSection = styled(Box)(({ theme, bgImage }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(4),
    opacity: 0,
    transform: 'translateY(50px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
}))

const Section = ({ children, bgImage }) => {
    const ref = useRef()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(ref.current)
                }
            },
            {
                threshold: 0.1,
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    return (
        <StyledSection 
            ref={ref}
            bgImage={bgImage}
            sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            }}
        >
            <Container>
                {children}
            </Container>
        </StyledSection>
    )
}

export default Section