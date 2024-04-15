import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../utils';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, CircularProgress, Divider } from '@mui/material';

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        validationSchema: Yup.object().shape({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            phone: Yup.string().required('Phone number is required'),
            email: Yup.string().email('Invalid email address').required('Email address is required'),
            password: Yup.string().required('Password is required'),
        }),
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: '',
        },
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            try {
                const res = await api.post('signup', values);
                toast.success(res.data.message);
                resetForm();
                navigate('/login');
            } catch (error) {
                const data = error.response.data;
                toast.error(data.message);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        autoComplete="first_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" align="center">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;
