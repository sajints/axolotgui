import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from "@auth0/auth0-react";
import GoogleIcon from '@mui/icons-material/Google';
const defaultTheme = createTheme();

export default function LoginForm() {
  const { loginWithRedirect } = useAuth0();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    loginWithRedirect({
      appState: {
        returnTo: "http://127.0.0.1:80",
      }, 
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow:"0px 3px 6px rgba(0,0,0,0.1)",
            borderRadius:'10px',
            padding:'20px',
            backgroundColor:"white"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#141b2d' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant='standard'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant='standard'

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , fontSize:"15px" ,backgroundColor:"#1f2a40"}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Button startIcon={<GoogleIcon sx={{color:"#4285F4"}}/>}  sx={{ mt: 3, mb: 2 , color:'black',textTransform:'capitalize' ,fontSize:'15px'}}   fullWidth variant="outlined" onClick={() => loginWithRedirect()}>Continue With google</Button>
             
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}