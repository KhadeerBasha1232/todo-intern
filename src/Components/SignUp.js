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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Slide } from '@mui/material';
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

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp(props) {
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch('https://todo-kb-intern.onrender.com/api/auth/createuser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password'),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // If the request was successful, show a success toast
        toast.success('User created successfully!');
        navigate("/");
        console.log(result);
      } else {
        // If the request failed, show an error toast with the error message
        toast.error(result.error || 'Failed to create user.');
        console.error(result.error || 'Failed to create user.');
      }
    } catch (error) {
      // If an exception occurs, show an error toast
      toast.error('An unexpected error occurred.');
      console.error('An unexpected error occurred.', error);
    }
  };

  const handleEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleExit = () => {
    document.body.style.overflow = '';
  };

  const appliedTheme = props.theme || localStorage.getItem('theme');

  const Theme = createTheme({
    palette: {
      mode: appliedTheme,
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <Slide
        direction="left"
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Slide>
    </ThemeProvider>
  );
}