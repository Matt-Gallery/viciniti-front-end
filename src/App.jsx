import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CustomerDashboard from './pages/CustomerDashboard';
import CompleteProviderProfile from './pages/CompleteProviderProfile';
import Services from './pages/Services';
import './App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Temporary auth check - we'll implement proper auth later
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Temporary role check - we'll implement proper role management later
const getUserRole = () => {
  return localStorage.getItem('userRole');
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route 
              path="dashboard" 
              element={
                isAuthenticated() ? (
                  getUserRole() === 'provider' ? (
                    <Navigate to="/provider-dashboard" replace />
                  ) : (
                    <CustomerDashboard />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="services" 
              element={
                isAuthenticated() ? (
                  <Services />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="provider-dashboard" 
              element={
                isAuthenticated() && getUserRole() === 'provider' ? (
                  <div>Provider Dashboard (Coming Soon)</div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="complete-profile" 
              element={
                isAuthenticated() && getUserRole() === 'provider' ? (
                  <CompleteProviderProfile />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
