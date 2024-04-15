import { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { api } from '../utils';

const Dashboard = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    is_active: true,
    user_id: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleLogin = async () => {
    if (password !== '123456') {
      setPasswordError('Incorrect password');
      return;
    }
    try {
      await login('reagan@gmail.com', '12345'); // Log in with predefined email and password
    } catch (error) {
      console.error('Login error:', error);
      setError('Login error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/property', formData);
      console.log(response.data);
      setFormData({
        name: '',
        description: '',
        image: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        location: '',
        is_active: true,
        user_id:1
      });
      setLoading(false);
    } catch (error) {
      console.error('Error creating property:', error);
      setError('Error creating property');
      setLoading(false);
    }
  };

  return (
    <Container>
      {!isAuthenticated ? (
        <div>
          <Typography variant="h4">Access Denied</Typography>
          <Typography variant="body1">You do not have permission to access this page.</Typography>
        </div>
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          {isAuthenticated ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              
              {/* Other form fields */}
              <TextField
             name="description"
             label="Description"
             value={formData.description}
             onChange={handleChange}
             fullWidth
             required
           />
           <TextField
             name="image"
             label="image"
             value={formData.image}
             onChange={handleChange}
             fullWidth
             required
           />
           <TextField
             name="price"
             label="Price"
             type="number"
             value={formData.price}
             onChange={handleChange}
             fullWidth
             required
           />
           <TextField
             name="bedrooms"
             label="Bedrooms"
             type="number"
             value={formData.bedrooms}
             onChange={handleChange}
             fullWidth
             required
           />
           <TextField
             name="bathrooms"
             label="Bathrooms"
             type="number"
             value={formData.bathrooms}
             onChange={handleChange}
             fullWidth
             required
           />
           <TextField
             name="location"
             label="Location"
             value={formData.location}
             onChange={handleChange}
             fullWidth
             required
           />

              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
              {error && <Typography variant="body2" color="error">{error}</Typography>}
            </form>
          ) : (
            <div>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
