import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesAPI } from '../services/api';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesAPI.getServices();
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services');
      console.error('Error fetching services:', err);
    }
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}/book`);
  };

  return (
    <div>
      <h2>Available Services</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {services.map(service => (
          <div 
            key={service.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              ':hover': {
                transform: 'scale(1.02)'
              }
            }}
            onClick={() => handleServiceClick(service.id)}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>Duration: {service.duration_minutes} minutes</p>
            <p>Price: ${service.base_price}</p>
            <button onClick={(e) => {
              e.stopPropagation();
              handleServiceClick(service.id);
            }}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services; 