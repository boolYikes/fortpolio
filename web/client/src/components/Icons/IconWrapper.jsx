import { Box, Skeleton } from '@mui/material';
import { useState } from 'react';

const IconWrapper = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        p: 1.5,
        // backgroundColor: 'rgba(200, 200, 200, 0.2)',
        // backgroundColor: 'white',
        borderRadius: 2,
        // boxShadow: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          borderRadius={2}
          width={48}
          animation="wave"
          height={48}
          sx={{ position: 'absolute' }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        sx={{
          width: 48,
          height: 48,
          display: loaded ? 'block' : 'none',
        }}
      />
    </Box>
  );
};

export default IconWrapper;
