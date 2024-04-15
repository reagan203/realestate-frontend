import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { api } from '../utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
	const navigate = useNavigate();

	const { setIsAuthenticated } = useContext(AuthContext);

	const formik = useFormik({
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email('Enter a valid email address')
				.required('Email address is required'),
			password: Yup.string().required('Password is required'),
		}),
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				const res = await api.post('login', values);

				toast.success(res.data.message);
				// reset form
				resetForm();
				// 1. store inside local storage
				localStorage.setItem('session', JSON.stringify(res.data));
				setIsAuthenticated(true);
				// 2. navigate user to homepage
				navigate('/home');
			} catch (error) {
				const data = error.response.data;

				toast.error(data.message);

				console.log('Unable to login');
			}
		},
	});

	return (
		<Box
			maxWidth={'xs'}
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar> */}
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box
				component="form"
				onSubmit={formik.handleSubmit}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					onChange={formik.handleChange}
					onBlur={formik.onBlur}
					value={formik.values.email}
					error={Boolean(formik.errors.email)}
					helperText={formik.errors.email}
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
					onChange={formik.handleChange}
					onBlur={formik.onBlur}
					value={formik.values.password}
					error={Boolean(formik.errors.password)}
					helperText={formik.errors.password}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Button
					disabled={formik.isSubmitting}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href="signup" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};