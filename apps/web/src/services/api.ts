import axios from 'axios';

// Instância central do axios, usada por todos os outros services.
// Toda requisição para a API passa por aqui.
export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// Interceptor: adiciona automaticamente o token JWT (se existir)
// em toda requisição, sem precisar repetir isso em cada chamada.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('payflow_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});