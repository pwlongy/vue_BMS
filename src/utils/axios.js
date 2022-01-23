import axios from 'axios'
export function request(config){

  const baseURL_dev = 'http://localhost:8080'

  const instance = axios.create({
    baseURL: baseURL_dev,
    timeout: 100000,
    headers: {
      'Context-Type': 'application/json;charset=UTF-8'
    }
  });

  // 请求拦截器
  instance.interceptors.request.use(function (config) {
    if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
    }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

  // 响应拦截器
  instance.interceptors.response.use(function (response) {
    // let dataCode = response.data.code
    // console.log(dataCode)
    // switch (dataCode){
    //   case 2001: 
    //     this.$message({
    //       message: response.data.msg
    //     });
    //     break;
    // }
    return response.data
    }, function (error) {
      return Promise.reject(error);
    });
    
    return instance(config)
}