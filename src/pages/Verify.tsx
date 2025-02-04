import { useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography 
} from '@mui/material';

// Tipagem para o estado do formulário
interface LocationState {
  email: string;
}


function Verify() {
  const [code, setCode] = useState<string>('');  // Tipando o estado `code` como string
  const [loading, setLoading] = useState<boolean>(false);  // Tipando o estado `loading` como boolean
  const location = useLocation();
  const navigate = useNavigate();

  // Tipando o estado `email` proveniente do `location.state`
  const email: string = (location.state as LocationState)?.email || ''; 

  const handleSubmit = async (e: FormEvent) => {  // Tipando o evento como FormEvent
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/verify', { 
        email, 
        code 
      });
      navigate('/login');
    } catch (error: any) {  // Tipando o erro com `any`, pois o tipo pode variar dependendo do erro
      alert(error.response?.data?.msg || 'Erro ao verificar código');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Verificar Código
        </Typography>
        <Typography variant="body2" gutterBottom>
          Digite o código enviado para {email}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Código de Verificação"
            value={code}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}  // Tipando o evento
            margin="normal"
            required
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Verify;
