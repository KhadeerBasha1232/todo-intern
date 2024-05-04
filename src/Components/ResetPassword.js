import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`https://todo-kb-intern.onrender.com/api/auth/resetpassword/${resetToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success('Password reset successfully');
          setResetSuccess(true);
          navigate('/login')
          
        } else {
          const data = await response.json();
          toast.error(data.message || 'Failed to reset password');
        }
      } catch (error) {
        console.error('Error resetting password:', error.message);
        toast.error('Failed to reset password');
      }
    },
  });

  const appliedTheme = localStorage.getItem('theme');

  const Theme = createTheme({
    palette: {
      mode: appliedTheme || 'light',
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {!resetSuccess ? (
          <form onSubmit={formik.handleSubmit} style={{width:"50%",marginLeft:"25%"}}>
            <h1>Reset Password</h1>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ marginBottom: '16px' }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              style={{ marginBottom: '16px' }}
            />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '24px' }}>
              Reset Password
            </Button>
          </form>
        ) : (
          <p style={{ fontSize: '18px', color: '#4caf50', marginTop: '24px' }}>Password reset successfully. You can now login with your new password.</p>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ResetPassword;
