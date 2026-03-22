import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CircularProgress, Box, Typography, Container } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const processLogout = async () => {
      // Create a delay promise to ensure visibility
      const delay = new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Run logout and delay concurrently
      await Promise.all([logout(), delay]);
      
      navigate('/Login', { replace: true });
    };

    processLogout();
  }, [logout, navigate]);

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ bgcolor: 'background.default' }}
    >
      <CircularProgress size={50} sx={{ color: '#d35400', mb: 3 }} />
      <Typography variant="h5" fontWeight="medium" color="text.primary">
        Logging out
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Please wait a moment while we secure your session.
      </Typography>
    </Box>
  );
};

export default Logout;