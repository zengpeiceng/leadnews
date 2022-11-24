import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');
  if(token) {
    config.headers.token = token;
  }
  return config;
}, err => {
  console.log(err);
})

instance.interceptors.response.use(config => {
  return config;
}, err => {
  console.log(err);
})

export default instance