import axios from 'axios';

// L'URL de votre Backend Spring Boot
const API_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- FONCTIONS D'APPEL ---

// 1. Voitures
export const carService = {
  getAll: () => api.get('/cars'),
  getById: (id: number) => api.get(`/cars/${id}`),
  create: (data: any) => api.post('/cars', data),
};

// 2. Chauffeurs
export const driverService = {
  getAll: () => api.get('/drivers'),
  getById: (id: number) => api.get(`/drivers/${id}`),
};

// 3. Agences
export const agencyService = {
  getAll: () => api.get('/agencies'),
  getById: (id: number) => api.get(`/agencies/${id}`),
};

// 4. Réservations
export const bookingService = {
  create: (data: any) => api.post('/bookings', data),
};

export default api;