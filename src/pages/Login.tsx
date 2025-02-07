import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Para mostrar um carregamento enquanto tenta logar

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null); // Limpa qualquer erro anterior

        console.log('Tentando login com:', { email, password });

        try {
            // Logando os dados antes de enviar a requisição
            const response = await axios.post('http://localhost:5000/api/auth/login', { 
                email,
                password
            });

            console.log('Login bem-sucedido:', response.data);
            // Aqui você pode redirecionar o usuário ou armazenar o token
            // Exemplo de redirecionamento:
            // window.location.href = '/dashboard'; // Redireciona para a página do dashboard após login bem-sucedido

        } catch (error: any) {
            // Captura o erro e loga informações detalhadas
            if (error.response) {
                // Captura a resposta do erro e mostra no estado
                console.error('Erro recebido do servidor:', error.response.data);
                setError(error.response.data.message || 'Erro desconhecido');
            } else {
                setError('Erro de comunicação com o servidor.');
            }

            // Logando o erro completo
            console.error('Erro no login:', error.response?.data || error);
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button>
            </form>
            {loading && <p>Carregando...</p>} {/* Exibe uma mensagem de carregamento */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe o erro, caso tenha */}
        </div>
    );
};

export default Login;
