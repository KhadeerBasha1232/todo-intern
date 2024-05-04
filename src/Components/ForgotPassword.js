import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box, Slide, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
});

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('https://todo-kb-intern.onrender.com/api/auth/forgotpassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Password reset email sent successfully.');
      } else {
        const error = await response.json();
        toast.error(`Failed to send password reset email: ${error.message}`);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('An unexpected error occurred.');
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
    <Container>
      
       <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 300 }}
        onEnter={handleEnter}
        onExited={handleExit}
      >
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleForgotPassword}>
          Send Reset Email
        </Button>
        <Box mt={2}>
          <Typography variant="body2">
            An email with instructions to reset your password will be sent to the provided email address.
          </Typography>
        </Box>
      </StyledPaper>
      </Slide>
    </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
