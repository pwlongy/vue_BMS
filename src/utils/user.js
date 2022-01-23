import {request} from "./axios"

export function login(userObj){
  return request({
    url: '/users/login',
    method: "post",
    data: {
      username: userObj.username,
      password: userObj.password
    }
  })
}

export function regist(userObj){
  console.log(userObj)
  return request({
    url: '/users/regist',
    method: 'post',
    data: {
      username: userObj.username,
      password: userObj.password
    }
  })
}