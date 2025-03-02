import { JSX, useCallback, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginProcesses } from '../login/loginProcess';
const Login = (): JSX.Element => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (): Promise<void> => {
    const isValid = await LoginProcesses.verifyUser(username, password);
    if (isValid) {
      localStorage.setItem('roomUsername', username);
      navigate('/chat');
    }
  }, [username, password, navigate]);

  const handleSignIn = useCallback(() => {
    navigate('/sign-in');
  }, []);

  return (
    <>
      <Box
        component="form"
        sx={{
          bgcolor: '#b4b4b4',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifySelf: 'center',
          height: '50vh',
          width: '50vw',
          borderRadius: 2,
        }}
      >
        <TextField
          id="username"
          variant="outlined"
          placeholder="Username"
          sx={{ width: '20vw', bgcolor: 'white', borderRadius: '5px' }}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></TextField>
        <TextField
          id="password"
          variant="outlined"
          placeholder="Password"
          sx={{
            width: '20vw',
            bgcolor: 'white',
            borderRadius: '5px',
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'black',
            width: '20vw',
            padding: '10px',
            ':hover': {
              bgcolor: '#143D60',
            },
            margin: 2,
          }}
          onClick={handleSubmit}
        >
          Login In
        </Button>
        <Box>Or</Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'black',
            width: '20vw',
            padding: '10px',
            ':hover': {
              bgcolor: '#143D60',
            },
            margin: 2,
          }}
          onClick={handleSignIn}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default Login;
