import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button } from '@mui/material';
import mailService from '../../services/mail';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Contact = ({ to }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendHandler = async (e) => {
    e.preventDefault();
    const payload = {
      to: to,
      title: email,
      content: message,
    };
    const result = await mailService.sendMail(payload);
    console.log(result); // use it in a notification component later
    setEmail('');
    setMessage('');
  };
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'Background.default',
          p: 4,
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Contact Me
        </Typography>
        <Box
          component="form"
          onSubmit={sendHandler}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 500,
            gap: 2,
          }}
        >
          <TextField
            label="Your Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Your Message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Typography
            sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}
          >
            Dee Henry Seon
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

Contact.propTypes = {
  to: PropTypes.string,
};

export default Contact;
