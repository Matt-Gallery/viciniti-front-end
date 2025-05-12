import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Only send required fields to backend
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Try to get error message from backend
        let errorMsg = 'Signup failed';
        try {
          const errorData = await response.json();
          errorMsg = errorData.detail || JSON.stringify(errorData);
        } catch {}
        throw new Error(errorMsg);
      }

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to sign up');
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>I am a:</label>
          <div>
            <input
              type="radio"
              name="role"
              value="customer"
              checked={formData.role === 'customer'}
              onChange={handleChange}
            />
            <label>Customer</label>
          </div>
          <div>
            <input
              type="radio"
              name="role"
              value="provider"
              checked={formData.role === 'provider'}
              onChange={handleChange}
            />
            <label>Service Provider</label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default SignUp; 