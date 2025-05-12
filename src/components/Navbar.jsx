import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { authAPI } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token') !== null;
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleSignOut = async () => {
    try {
      await authAPI.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ 
          flexGrow: 1, 
          textDecoration: 'none', 
          color: 'inherit' 
        }}>
          Viciniti
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
          >
            Home
          </Button>

          {isAuthenticated && (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/services"
              >
                Services
              </Button>
              <Button 
                color="inherit" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          )}

          {!isAuthenticated && !isAuthPage && (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
              >
                Sign In
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 