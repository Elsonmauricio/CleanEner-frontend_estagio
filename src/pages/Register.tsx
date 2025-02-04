import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  Box 
} from '@mui/material';
import axios from 'axios';
import '../styles/Register.css';

// Tipagem para o estado do formulário
interface FormData {
  email: string;
  name: string;
  nif: string;
  phone: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    nif: '',
    phone: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Código de verificação enviado para seu email!');
      navigate('/verify', { state: { email: formData.email } });
    } catch (error: any) {
      alert(error.response?.data?.msg || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: 8, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        width: '80%'
      }}
    >
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <TextField
              fullWidth
              label="Nome Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <TextField
              fullWidth
              label="NIF"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              required
              inputProps={{ 
                pattern: "[0-9]*",
                title: "Apenas números são permitidos"
              }}
            />
            
            <TextField
              fullWidth
              label="Número de Celular"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              inputProps={{ 
                pattern: "[0-9]*",
                title: "Apenas números são permitidos"
              }}
            />
            
            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Enviando...' : 'Registrar'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Register; 

