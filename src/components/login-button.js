// src/components/login-button.js
import { Box, Button, TextField } from "@mui/material";
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button type="submit" color="secondary" variant="contained"
    onClick={() => loginWithRedirect()}>
                Log In
              </Button>
    
  );
};

export default LoginButton;