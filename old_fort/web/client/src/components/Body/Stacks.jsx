import { motion } from 'framer-motion';
import { Box, Grid2 } from '@mui/material';
import PropTypes from 'prop-types';
import IconWrapper from '../Icons/IconWrapper';

const Stacks = ({ techStacks }) => {
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
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Grid2 container spacing={2} sx={{ width: '80%' }}>
          {techStacks.map((stack, index) => {
            return (
              /** in Grid2, item prop is implicit */
              <Grid2
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  // bgcolor: 'rgba(200, 200, 200, 0.2)',
                  bgcolor: 'white',
                  color: 'primary.main',
                  p: 1,
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              >
                {stack.icon ? (
                  <IconWrapper
                    src={`${import.meta.env.BASE_URL}svg/${stack.icon}.svg`}
                    alt={stack.title}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      p: 1.5,
                      backgroundColor: 'rgba(200, 200, 200, 0.2)',
                      borderRadius: 2,
                      boxShadow: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    😁
                  </Box>
                )}
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </motion.div>
  );
};

Stacks.propTypes = {
  techStacks: PropTypes.array,
};

export default Stacks;
