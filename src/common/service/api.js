import { getAPIClient } from "./axios";

export const api = getAPIClient()

export const resources = (process.env.PUBLIC_API_URL || 'http://127.0.0.1:8080') + '/static/'