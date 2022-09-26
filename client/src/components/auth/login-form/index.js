import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import { Authenticate } from '../../../services/auth.service';
import { AuthContext } from '../../../store/auth.context';

const LoginForm = () => {
  const { authenticate } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const onHandleChange = (identifier, event) => {
    const { value } = event.target;

    setFormValues((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };

  const onLoginHandler = async () => {
    try {
      const { username, password } = formValues;

      const { data } = await Authenticate({ email: username, password });

      authenticate(data);

      navigate('/booking');
    } catch (e) {}
  };

  return (
    <>
      <TextField
        required
        label="Username"
        value={formValues.username}
        onChange={onHandleChange.bind(this, 'username')}
        sx={{ mb: 2, width: '100%' }}
      />

      <TextField
        required
        label="Password"
        value={formValues.password}
        onChange={onHandleChange.bind(this, 'password')}
        sx={{ mb: 2, width: '100%' }}
      />

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3, height: '50px' }}
        onClick={onLoginHandler}
      >
        Book
      </Button>
    </>
  );
};

export default LoginForm;
