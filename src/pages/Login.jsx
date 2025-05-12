import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Attempting login with:', formData);
      const data = await authAPI.login(formData);
      console.log('Login response:', data);
      
      // Store the token and user role
      localStorage.setItem('token', data.access);
      localStorage.setItem('userRole', data.user.role);
      
      console.log('Stored token:', localStorage.getItem('token'));
      console.log('Stored role:', localStorage.getItem('userRole'));
      
      // Navigate to the appropriate dashboard based on role
      if (data.user.role === 'provider') {
        console.log('Navigating to provider dashboard');
        navigate('/provider-dashboard');
      } else {
        console.log('Navigating to customer dashboard');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error details:', err);
      setError(err.message || 'Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/signup')}>
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login; 