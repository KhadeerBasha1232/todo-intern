import React, { useState, useEffect } from 'react';
import { Button, TextField, ThemeProvider, createTheme, Slide, Select, MenuItem, FormControl, InputLabel, Box, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    date: yup
        .date()
        .required('Date is required')
        .nullable()
        .min(new Date(), "Date can't be in the past"),
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

const TodoEditForm = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const todoId = searchParams.get('todoId') || '';
    const [todoData, setTodoData] = useState(null);

    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const response = await fetch(`https://todo-kb-intern.onrender.com/api/main/todos/${todoId}`);
                const data = await response.json();
                setTodoData(data.todo);
                console.log(data.todo);
            } catch (error) {
                console.error('Error fetching TODO data:', error);
            }
        };

        fetchTodoData();
    }, [todoId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: todoData?.title || '',
            description: todoData?.description || '',
            date: todoData?.due_datetime?.split('T')[0] || '',
            time: todoData?.due_datetime?.split('T')[1]?.slice(0, 5) || '',
            priority: todoData?.priority || 0, // Set default value to 0 (Low) if not available
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const authToken = localStorage.getItem('authToken');

                const headers = {
                    'Content-Type': 'application/json',
                    'auth-token': `${authToken}`,
                };

                const response = await fetch(`https://todo-kb-intern.onrender.com/api/main/todos/${todoId}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    console.log(values);
                    toast.success("Todo Updated Successfully")
                    console.log('Todo updated successfully');
                } else {
                    console.error('Failed to update todo');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    });

    if (!todoData) {
        // You can render a loading state while fetching TODO data
        return <div>Loading...</div>;
    }

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
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={{ enter: 500, exit: 300 }}>
                <form className={classes.form} style={{ marginTop: '50px', marginBottom:"100px" }} onSubmit={formik.handleSubmit}>
                    <h2>Edit Todo</h2>
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

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="priority">Priority</InputLabel>
                        <Select
                            label="Priority"
                            id="priority"
                            name="priority"
                            value={formik.values.priority}
                            onChange={formik.handleChange}
                            error={formik.touched.priority && Boolean(formik.errors.priority)}
                            helperText={formik.touched.priority && formik.errors.priority}
                        >
                            <MenuItem value={0}>Low</MenuItem>
                            <MenuItem value={1}>Medium</MenuItem>
                            <MenuItem value={2}>High</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </form>
            </Slide>
            </Card>
            </Box>
        </ThemeProvider>
    );
};

export default TodoEditForm;
