import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentsAPI } from '../services/api';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentsAPI.getAll();
      setAppointments(data);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await appointmentsAPI.cancel(appointmentId);
      fetchAppointments();
    } catch (err) {
      setError('Failed to cancel appointment');
      console.error('Error canceling appointment:', err);
    }
  };

  const handleChangeAppointment = (appointmentId) => {
    // TODO: Implement change appointment functionality
    console.log('Change appointment:', appointmentId);
  };

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
                <p>Service: {appointment.service}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Status: {appointment.status}</p>
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
        <button onClick={() => navigate('/book-appointment')}>
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