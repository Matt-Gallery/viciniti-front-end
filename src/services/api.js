// Base URL for the API
const API_BASE_URL = 'http://localhost:8000'; // Python backend URL

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  console.log('Current token:', token);
  console.log('Making request to:', endpoint);
  
  // If no token is present and the endpoint requires authentication, redirect to login
  if (!token && !endpoint.includes('/login') && !endpoint.includes('/signup')) {
    console.log('No token found for protected endpoint');
    throw new Error('Authentication required');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  // Remove any undefined headers
  Object.keys(headers).forEach(key => {
    if (headers[key] === undefined) {
      delete headers[key];
    }
  });

  console.log('Request headers:', headers);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Include cookies if any
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // If we get a 401 Unauthorized, clear the token and throw an error
    if (response.status === 401) {
      console.log('Received 401 Unauthorized, clearing token');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Error response data:', errorData);
      throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials) => 
    apiRequest('/api/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  signup: (userData) =>
    apiRequest('/api/signup/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },
};

// User API calls
export const userAPI = {
  getProfile: () =>
    apiRequest('/api/user/'),

  updateProfile: (profileData) =>
    apiRequest('/api/user/', {
      method: 'POST',
      body: JSON.stringify(profileData),
    }),
};

// Appointments API calls
export const appointmentsAPI = {
  getAppointments: () =>
    apiRequest('/api/appointments/'),

  createAppointment: (appointmentData) =>
    apiRequest('/api/appointments/', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),

  updateAppointment: (id, appointmentData) =>
    apiRequest(`/api/appointments/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    }),

  deleteAppointment: (id) =>
    apiRequest(`/api/appointments/${id}/`, {
      method: 'DELETE',
    }),
};

// Services API calls
export const servicesAPI = {
  getServices: () =>
    apiRequest('/api/services/'),

  getAvailableSlots: (serviceId) =>
    apiRequest(`/api/appointments/available/?service_id=${serviceId}`),
}; 