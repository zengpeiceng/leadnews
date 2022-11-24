import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  baseURL: "http://localhost:8000/weadmin",
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, err => {
  console.log(err);
})

instance.interceptors.response.use(config => {
  return config.data;
}, err => {
  console.log(err);
})

export default instance