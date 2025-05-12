import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up:', formData);
  };

  return (
    <Box>
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />
        
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">I am a:</FormLabel>
          <RadioGroup
            name="role"
            value={formData.role}
            onChange={handleChange}
            row
          >
            <FormControlLabel 
              value="customer" 
              control={<Radio />} 
              label="Customer" 
            />
            <FormControlLabel 
              value="provider" 
              control={<Radio />} 
              label="Service Provider" 
            />
          </RadioGroup>
        </FormControl>

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Sign Up
        </Button>
        <Link
          component="button"
          onClick={() => navigate('/login')}
          sx={{ display: 'block', textAlign: 'center' }}
        >
          Already have an account? Login
        </Link>
      </form>
    </Box>
  );
};

export default SignUp; 