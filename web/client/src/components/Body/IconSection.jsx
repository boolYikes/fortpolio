// The traits section
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Grid2, Typography } from '@mui/material';
import traitsService from '../../services/traits';
import CustomTooltip from '../Misc/CustomTooltip';

const IconSection = () => {
  const [traits, setTraits] = useState([]);
  useEffect(() => {
    traitsService.getAll().then((traits) => setTraits(traits));
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          p: 4,
        }}
      >
        <Grid2 container spacing={2} sx={{ width: '80%' }}>
          <Grid2
            xs={12}
            sm={6}
            md={3}
            textAlign="center"
            sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}
          >
            <Typography
              sx={{
                color: '#569CD6',
                fontSize: '1.5rem',
              }}
            >
              Class&nbsp;&nbsp;
            </Typography>
            <Typography
              sx={{
                color: '#4EC9B0',
                fontSize: '1.5rem',
              }}
            >
              Me:
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
      <Box
        sx={{
          minHeight: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', //'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          p: 4,
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{ width: '80%', justifyContent: 'space-between' }}
        >
          {traits.map((item, index) => {
            const [icon, title] = item.title.split(' ');
            return (
              <Grid2 key={index} xs={12} sm={6} md={3} textAlign="center">
                <CustomTooltip title={item.description}>
                  <Box sx={{ fontSize: '2rem' }}>{icon}</Box>
                  <Typography sx={{ fontSize: '1.5rem' }}>{title}</Typography>
                </CustomTooltip>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </motion.div>
  );
};

export default IconSection;
