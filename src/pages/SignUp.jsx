import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

    try {
      await authAPI.signup(formData);
      navigate('/login');
    } catch (err) {
      setError('Failed to sign up');
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
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