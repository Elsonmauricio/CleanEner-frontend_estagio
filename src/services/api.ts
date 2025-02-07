import axios from "axios";

const api = axios.create({
  baseURL: "https://cleanenerbackend-1tcxq3gvt-jeanpierrepros-projects.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {}; // Ensure headers is defined
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Tipagem das respostas da API (pode ajustar conforme necessário)
interface AuthResponse {
  message: string;
  token?: string;
}

// Funções de autenticação com tipagem
export const login = (email: string, password: string) => 
  api.post<AuthResponse>("/auth/login", { email, password });

export const register = (email: string) => 
  api.post<AuthResponse>("/auth/register", { email });

export const verify = (email: string, code: string) => 
  api.post<AuthResponse>("/auth/verify", { email, code });

export const changePassword = (oldPassword: string, newPassword: string) => 
  api.post<AuthResponse>("/auth/change-password", { oldPassword, newPassword });

export default api;
