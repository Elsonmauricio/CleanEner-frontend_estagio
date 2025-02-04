import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import '../styles/Login.css';

// Tipagem para o erro de login
type ErrorResponse = {
  msg?: string;
};

interface User {
  id: string; // Example property
  name: string; // Example property
  email: string; // Example property
  // Add other properties as needed
}

interface LoginResponse {
  token: string;
  user: User; // Assuming User is already defined in your code
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('Tentando login com:', { email, password });

    try {
      const response = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      console.log('Resposta do servidor:', response.data);

      if (response.data.token) {
        // Salvar token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirecionar para home em vez de dashboard
        navigate('/');
      }
    } catch (err: any) {
      const errorResponse: ErrorResponse = err.response?.data;
      console.error('Erro no login:', errorResponse.msg || err.message);
      setError(errorResponse.msg || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
    maxWidth="sm" 
    sx={{ 
      mt: 8, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}
    >
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          
          <Button 
            fullWidth 
            variant="contained" 
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
