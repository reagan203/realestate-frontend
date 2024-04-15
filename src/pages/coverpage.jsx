import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const CoverImage = styled('div')({
  backgroundImage: 'url(https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg)', // Replace with actual image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 'calc(100vh - 64px)', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
});

const CoverPage = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RealEstate
          </Typography>
          <Button color="inherit" component={Link} to="/signup">Register</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>
        <CoverImage>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h3" gutterBottom>
                  Find Your Dream Home
                </Typography>
                <Typography variant="body1" gutterBottom>
                 Your dream home is one click away from bein a reality welcome to the best realestate website that gets you that one step closer to the greatest felling of calling some place home
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/signup">
                  View Properties
                </Button>
              </Grid>
            </Grid>
          </Container>
        </CoverImage>
      </Box>
    </>
  );
};

export default CoverPage;
