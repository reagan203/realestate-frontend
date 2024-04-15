import  { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { api } from '../utils';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/property');
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Properties
      </Typography>
      <Grid container spacing={3}>
        {properties.map(property => (
          <Grid item key={property.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <img src={property.image} alt="Property" style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography variant="h6" gutterBottom>
                  {property.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {property.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${property.price}
                </Typography>
                {isAuthenticated && (
                  <Typography variant="body2" color="textSecondary">
                    Location: {property.location}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
