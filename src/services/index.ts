import axios from 'axios';

const API_KEY = process.env.COINCAP_API_KEY;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COINCAP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
});

export default axiosInstance;
