import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

import { Login } from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { NavBar } from './components/header';
import CoverPage from './pages/coverpage';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home/*" element={<HomeWithNavBar />} />
      </Routes>
    </>
  );
}

function HomeWithNavBar() {
  const location = useLocation();

  // Check if the current location is the home page ("/home")
  const isHome = location.pathname === '/home';

  return (
    <>
      {/* Render the navbar only if on the home page */}
      {isHome && <NavBar />}
      <Container component="main">
        {/* Use nested Routes to render the nested Home component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
