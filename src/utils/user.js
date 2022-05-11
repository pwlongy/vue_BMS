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

// 修改用户信息
export function undataUser(user) {
  return request({
    url: '/users/updataUser',
    method: 'post',
    data: {
      user
    }
  })
}

// 修改用户头像
export function updataUserAvatar(file){
  // console.log(file)
  return request({
    url: '/article/pullImg',
    method: "post",
    data: {
      photo: file
    },
    contentType: "multipart/form-data",
  })
}

// 关注
export function followerMan(id, userId){
  return request({
    url: '/users/followerMan',
    method: 'post',
    data: {
      id,
      userId
    }
  })
}

// 取消关注
export function updatafollowerMan(id, userId){
  return request({
    url: '/users/updatafollowerMan',
    method: 'post',
    data: {
      id,
      userId
    }
  })
}

// 获取用户基本信息
export function getuserMsg(id){
  return request({
    url: '/users/getuserMsg',
    method: 'get',
    params: {
      id
    }
  })
}