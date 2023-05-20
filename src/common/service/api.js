import { Cookies } from "react-cookie";
import { getAPIClient } from "./axios";

export const api = getAPIClient()

export const resources = (process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080') + '/static/'

export default function setTokenApi(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const cookies = new Cookies();
    cookies.set('token', token);
}