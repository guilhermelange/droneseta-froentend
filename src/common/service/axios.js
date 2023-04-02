import axios from "axios";
// import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  // const { token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.PUBLIC_API_URL || 'http://127.0.0.1:8080'
  })

  api.interceptors.request.use(config => {
    return config;
  })

  // if (token) {
  //   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // }

  return api;
}