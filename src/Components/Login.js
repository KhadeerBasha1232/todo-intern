import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import {  Slide, createTheme } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://logicbyte.live">
      KB's TODO App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn(props) {


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const apiUrl = 'https://todo-kb-intern.onrender.com/api/auth/login/';
    console.log("Form Data :", data.get('email'));
  
    try {
      const response = await axios.post(apiUrl, {
        email: data.get('email'),
        password: data.get('password'),
      });
  
      console.log('Response:', response.data);
      localStorage.setItem('authToken',response.data.authtoken)
      localStorage.setItem('name',response.data.name)
      navigate('/');
      toast.success("LogIn Success")
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Incorrect Email or Password')
    }
  };


  const appliedTheme = props.theme || localStorage.getItem('theme');

  const Theme = createTheme({
    palette: {
      mode: appliedTheme,
    },
  });


  const handleEnter = () => {
    document.body.style.overflowY = 'hidden';
  };

  const handleExit = () => {
    document.body.style.overflowY = '';
  };


  return (
    <ThemeProvider theme={Theme}>
             <Slide
        direction="up"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 300 }}
        onEnter={handleEnter}
        onExited={handleExit}
      >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to='/forgotpassword' variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        
      </Container>
      </Slide>
    </ThemeProvider>
  );
}