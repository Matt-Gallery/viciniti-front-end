import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentsAPI } from '../services/api';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Dashboard mounted, current token:', token);
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching appointments...');
      const response = await appointmentsAPI.getAppointments();
      console.log('Appointments response:', response);
      setAppointments(response.appointments || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      if (err.message.includes('Authentication required') || err.message.includes('Session expired')) {
        console.log('Auth error, redirecting to login');
        navigate('/login');
      } else {
        setError('Failed to fetch appointments');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await appointmentsAPI.deleteAppointment(appointmentId);
      fetchAppointments();
    } catch (err) {
      console.error('Error canceling appointment:', err);
      if (err.message.includes('Authentication required') || err.message.includes('Session expired')) {
        navigate('/login');
      } else {
        setError('Failed to cancel appointment');
      }
    }
  };

  const handleChangeAppointment = (appointmentId) => {
    // TODO: Implement change appointment functionality
    console.log('Change appointment:', appointmentId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Dashboard</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div>
        <h3>Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p>No upcoming appointments</p>
        ) : (
          <div>
            {appointments.map(appointment => (
              <div key={appointment.id}>
                <p>Service: {appointment.service_title}</p>
                <p>Date: {new Date(appointment.datetime).toLocaleDateString()}</p>
                <p>Time: {new Date(appointment.datetime).toLocaleTimeString()}</p>
                <p>Location: {appointment.location}</p>
                <p>Price: ${appointment.discounted_price || 'N/A'}</p>
                <button onClick={() => handleCancelAppointment(appointment.id)}>
                  Cancel
                </button>
                <button onClick={() => handleChangeAppointment(appointment.id)}>
                  Change
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3>Quick Actions</h3>
        <button onClick={() => navigate('/services')}>
          Book New Appointment
        </button>
        <button onClick={() => navigate('/profile')}>
          View/Edit Profile
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard; 