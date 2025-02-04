import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ 
        p: 4, 
        mt: 4,
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)'
      }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2'
            }}
          >
            Bem-vindo ao Sistema
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: '#666',
              lineHeight: 1.6
            }}
          >
            Esta é a página inicial do nosso sistema de autenticação.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
