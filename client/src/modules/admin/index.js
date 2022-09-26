import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { AuthContext } from '../../store/auth.context';
import LoginForm from '../../components/auth/login-form';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate('/booking', { replace: true });
  }, [user]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          maxWidth: '400px',
          width: '100%',
          padding: 4,
        }}
      >
        <Typography variant='h4' sx={{ textTransform: 'uppercase', mb: 3 }}>
          Login
        </Typography>

        <LoginForm />
      </Box>
    </Box>
  );
};

export default Admin;
