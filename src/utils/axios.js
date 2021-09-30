import axios from 'axios'

export function request (config){

  const baseURL_dev = 'http://localhost:8080'

  const instance = axios.create({
    baseURL: baseURL_dev,
    timeout: 100000,
    headers: {
      'Context-Type': 'application/json;charset=UTF-8'
    }
  });

  instance.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
    
    return instance(config)
}