import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert
} from '@mui/material';

const CompleteProviderProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    phoneNumber: '',
    businessDescription: ''
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
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Redirect to provider dashboard or home
      navigate('/');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error('Profile completion error:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h5">Complete Your Business Profile</Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          label="Business Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Business Address"
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Business Description"
          name="businessDescription"
          multiline
          rows={4}
          value={formData.businessDescription}
          onChange={handleChange}
          margin="normal"
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Complete Profile
        </Button>
      </form>
    </Box>
  );
};

export default CompleteProviderProfile; 