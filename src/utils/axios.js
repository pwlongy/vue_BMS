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
    //统一处理表单格式
    if (config.contentType === "multipart/form-data") {
      //formData 表示表单数据的键值对 key/value 的构造方式
      const formData = new FormData();
      //这里遍历一下 因为有可能除了upload 还有其他参数的嘛
      for (let key in config.data) {
          //再一个个append进去
          formData.append(key, config.data[key]);
      }
      //重新赋值给config.data -------return出去
      config.data = formData;
      //这里设置multipart/form-data 表单传数据需要的contentType
      config.headers["Content-Type"] = config.contentType;
  }
    // console.log(config)
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
    //     break;
    // }
    return response.data
    }, function (error) {
      return Promise.reject(error);
    });
    
    return instance(config)
}