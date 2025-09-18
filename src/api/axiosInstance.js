// api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.163.21.203:3000/api',
  timeout: 10000,
});

export default api;