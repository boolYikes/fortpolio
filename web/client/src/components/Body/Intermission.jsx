import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Intermission = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
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
        <Typography variant="h4" textAlign="center">
          But hey, enough about systems that “quietly do their job” — that’s
          just code for “I’ve been staring at logs for six hours and pretending
          it’s normal.” Let’s get to the fun part: the builds, the hacks, the
          late-night ideas that somehow worked (and the ones that definitely
          shouldn’t have). Below you’ll find{' '}
          <Box
            component="span"
            sx={{ color: 'secondary.main', fontWeight: 'bolder' }}
          >
            the projects
          </Box>{' '}
          where things got weird, ambitious, occasionally elegant, and sometimes
          duct-taped together — just the way I like it.
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Intermission;
