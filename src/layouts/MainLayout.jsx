import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header will go here */}
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
      {/* Footer will go here */}
    </Box>
  );
};

export default MainLayout; 