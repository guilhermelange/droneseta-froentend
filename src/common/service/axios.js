import axios from "axios"
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export function getAPIClient(ctx?: any) {
  const token = cookies.get('token')
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080'
  })

  api.interceptors.request.use(config => {
    return config;
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}