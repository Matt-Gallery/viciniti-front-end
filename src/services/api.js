// Base URL for the API
const API_BASE_URL = 'http://127.0.0.1:8000'; // Python backend URL

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials) => 
    apiRequest('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  signup: (userData) =>
    apiRequest('/api/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () =>
    apiRequest('/api/logout', {
      method: 'POST',
    }),
};

// User API calls
export const userAPI = {
  getProfile: () =>
    apiRequest('/api/user'),

  updateProfile: (profileData) =>
    apiRequest('/api/user', {
      method: 'POST',
      body: JSON.stringify(profileData),
    }),
};

// Appointments API calls
export const appointmentsAPI = {
  getAppointments: () =>
    apiRequest('/api/appointments'),

  createAppointment: (appointmentData) =>
    apiRequest('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),

  updateAppointment: (id, appointmentData) =>
    apiRequest(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    }),

  deleteAppointment: (id) =>
    apiRequest(`/api/appointments/${id}`, {
      method: 'DELETE',
    }),
};

// Services API calls
export const servicesAPI = {
  getServices: () =>
    apiRequest('/api/services'),

  getAvailableSlots: (serviceId) =>
    apiRequest(`/api/appointments/available?service_id=${serviceId}`),
}; 