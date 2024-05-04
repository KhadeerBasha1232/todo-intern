import React from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme, Slide, Box, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.number().required('Priority is required'),
});


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '400px',
    margin: '0 auto',
  },
}));

export default function TodoForm(props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      priority: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const authToken = localStorage.getItem('authToken');
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': `${authToken}`,
        };

        const response = await fetch('https://todo-kb-intern.onrender.com/api/main/todos/', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success("TODO Added Successfully");
          console.log('Todo added successfully');
        } else {
          toast.error("Failed To Add TODO");
          console.error('Failed to add todo');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });
  
  function getTodayDateInISTFormat() { 
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  


  
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
      <Box sx={{ height: "100%" }}>
      <Card style={{borderRadius:"0px", height: "100vh", marginBottom:"150px" , overflow:"auto"}}>
      <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 300 }}
        onEnter={handleEnter}
        onExited={handleExit}
      >
        <form className={classes.form} style={{ marginTop: "50px", marginBottom:"100px" }} onSubmit={formik.handleSubmit}>
          <h2>Add TODO</h2>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />

          <TextField
            type="date"
            variant="outlined"
            fullWidth
            id="date"
            name="date"
            inputProps={{ min: getTodayDateInISTFormat() }}
            disablePast
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          <TextField
            type="time"
            variant="outlined"
            fullWidth
            id="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
          />

          <FormControl variant="outlined" fullWidth error={formik.touched.priority && Boolean(formik.errors.priority)}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              label="Priority"
              labelId="priority-label"
              id="priority"
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Low</MenuItem>
              <MenuItem value={1}>Medium</MenuItem>
              <MenuItem value={2}>High</MenuItem>
            </Select>
          </FormControl>

          {formik.touched.priority && formik.errors.priority && (
            <div style={{ color: 'red' }}>{formik.errors.priority}</div>
          )}

          <Button type="submit" variant="contained" color="primary">
            Add Todo
          </Button>
        </form>
      </Slide>
        </Card>
        </Box>
    </ThemeProvider>
  );
}
