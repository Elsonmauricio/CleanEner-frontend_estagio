import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Divider
} from '@mui/material';
import axios from 'axios';

// Tipagem para os dados do usuário
interface User {
  name: string;
  email: string;
  phone: string;
}

// Tipagem para o estado do formulário
interface FormData {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserResponse {
  user: User; // Assuming User is already defined in your code
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      setUser(storedUser);
      setFormData(prev => ({
        ...prev,
        name: storedUser.name || '',
        email: storedUser.email || '',
        phone: storedUser.phone || ''
      }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put<UserResponse>(
        'https://cleanenerbackend-lw75tclsk-jeanpierrepros-projects.vercel.app/api/auth/update-profile',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const updatedUser = { ...user, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'h',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess('Senha atualizada com sucesso!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Erro ao atualizar senha');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Meu Perfil
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleUpdateProfile}>
          <TextField fullWidth label="Nome" name="name" value={formData.name} onChange={handleChange} margin="normal" disabled={loading} />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" disabled={loading} />
          <TextField fullWidth label="Telefone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" disabled={loading} />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Atualizar Perfil'}</Button>
        </form>

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }}><Typography variant="body1" color="textSecondary">Alterar Senha</Typography></Divider>
          <form onSubmit={handleUpdatePassword}>
            <TextField fullWidth label="Senha Atual" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} margin="normal" disabled={loading} />
            <TextField fullWidth label="Nova Senha" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} margin="normal" disabled={loading} />
            <TextField fullWidth label="Confirmar Nova Senha" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} margin="normal" disabled={loading} />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Atualizar Senha'}</Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
