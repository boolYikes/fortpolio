import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import headerIcon from '../assets/nope.jpg';

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
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
            🛠️ Build to
            <br />
            <Box
              component="span"
              sx={{ color: 'secondary.main', fontWeight: 'bolder' }}
            >
              Anticipate,
            </Box>{' '}
            <br />
            <Box
              component="span"
              sx={{ color: 'secondary.main', fontWeight: 'bolder' }}
            >
              Automate,
            </Box>{' '}
            <br />
            And{' '}
            <Box
              component="span"
              sx={{ color: 'secondary.main', fontWeight: 'bolder' }}
            >
              Adapt
            </Box>
          </Typography>
          <Typography variant="body1">
            I build data{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', fontWeight: 'bolder' }}
            >
              pipelines
            </Box>{' '}
            and{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', fontWeight: 'bolder' }}
            >
              automation
            </Box>{' '}
            systems that do their job so well, you forget they exist — like good
            plumbing or a decent plot twist. Whether it’s wrangling messy
            streams, taming flaky schedulers, or duct-taping APIs until they
            behave, I’m here for the weird, the broken, and the beautifully
            complex. My mission? Make things{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', fontWeight: 'bolder' }}
            >
              flow smoothly, fail loudly
            </Box>{' '}
            (in logs, not meetings), and{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', fontWeight: 'bolder' }}
            >
              scale
            </Box>{' '}
            like it was planned all along.
          </Typography>
        </Box>
        <Box
          component="img"
          src={headerIcon}
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
            maskComposite: 'intersect', // Ensures all fades blend together
            WebkitMaskComposite: 'destination-in',
          }}
        />
      </Box>
    </motion.div>
  );
};

export default Header;
