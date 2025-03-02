import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SignInAPI, UserDetails } from '../login/SignInProcess';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [details, setDetails] = useState({
    email: '',
    displayName: '',
    username: '',
    password: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleChange = (e: any) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = useCallback(async (): Promise<void> => {
    const userDetails: UserDetails = {
      name: details.displayName,
      email: details.email,
      username: details.username,
      password: details.password,
    };

    const { success } = await SignInAPI.signIn(userDetails);
    if (success) {
      navigate('/');
    }
  }, [details, navigate]);

  return (
    <>
      <Box
        component="form"
        sx={{
          bgcolor: '#7E5CAD',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifySelf: 'center',
          height: '60vh',
          width: '30vw',
          borderRadius: 2,
        }}
      >
        <TextField
          id="Email"
          name="email"
          variant="outlined"
          placeholder="Enter email"
          sx={{
            bgcolor: '#FFFDF0',
            width: '20vw',
            borderRadius: 2,
            margin: 0.5,
          }}
          value={details.email}
          onChange={handleChange}
        />
        <TextField
          id="DisplayName"
          variant="outlined"
          name="displayName"
          placeholder="Enter display name"
          sx={{
            bgcolor: '#FFFDF0',
            width: '20vw',
            borderRadius: 2,
            margin: 0.5,
          }}
          value={details.displayName}
          onChange={handleChange}
        />
        <TextField
          id="username"
          variant="outlined"
          placeholder="Enter username"
          name="username"
          sx={{
            bgcolor: '#FFFDF0',
            width: '20vw',
            borderRadius: 2,
            margin: 0.5,
          }}
          value={details.username}
          onChange={handleChange}
        />
        <TextField
          id="password"
          variant="outlined"
          placeholder="Enter password"
          name="password"
          type={passwordVisibility ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    sx={{
                      bgcolor: 'black',
                    }}
                  ></IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            bgcolor: '#FFFDF0',
            width: '20vw',
            borderRadius: 2,
            margin: 0.5,
          }}
          value={details.password}
          onChange={handleChange}
        />
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
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default SignIn;
