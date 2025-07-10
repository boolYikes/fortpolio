// OR, use theme overrides... maybe later
import { Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomTooltip = ({ children, title }) => {
  return (
    <Tooltip
      title={
        <Typography sx={{ fontSize: '1rem', color: '#fff' }}>
          {title}
        </Typography>
      }
      enterDelay={300}
      arrow
      slotProps={{
        tooltip: {
          sx: (theme) => ({
            bgcolor: `${theme.palette.background.default}`,
            color: `${theme.palette.common.white}`,
            fontSize: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: 1,
            border: `2px solid ${theme.palette.secondary.main}`,
          }),
        },
        arrow: {
          sx: (theme) => ({
            color: '#fff',
            '&::before': {
              backgroundColor: `${theme.palette.background.default}`,
              border: `2px solid ${theme.palette.secondary.main}`,
            },
          }),
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

CustomTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default CustomTooltip;
