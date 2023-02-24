import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create();

// Adicione um interceptor para enviar o cookie com cada solicitação
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  console.log(token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(config);
  return config;
});

// Adicione um interceptor para receber o cookie com cada resposta
api.interceptors.response.use((response) => {
  const authorizationString = response.data.cookie[0];
  const startIndex = authorizationString.indexOf('=') + 1;
  const endIndex = authorizationString.indexOf(';');

  const token = authorizationString.substring(startIndex, endIndex);
  console.log(token);
  if (token) {
    Cookies.set('token', token);
  }
  console.log(response);
  return response;
});

export default api;
