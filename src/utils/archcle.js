import { request } from "./axios";

// 发布博客
export function createBlog(blogObj){
  return request({
    url: '/article/creatArticle',
    method: 'post',
    data: {
      title: blogObj.title,
      userId: blogObj.userId,
      content: blogObj.content,
      overview: blogObj.overview,
      titleImg: blogObj.titleImg,
      classId: blogObj.classId,
      tags: blogObj.tags
    }
  })
}

// 通过id查找内容
export function getBlogForId(id){
  return request({
    url: '/article/getBlogForId',
    params: {
      id
    }
  })
}

// 查询所有博客
export function getBlog(){
  return request({
    url: '/article/getBlog',
    method: 'get'
  })
}


// 图片上传
export function pullImg(file) {
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

// 查询个人博客文章
export function getUserBlog(id, page, pageNum) {
  console.log(id, page)
  return request({
    url: '/article/pagination',
    method: 'get',
    params: {
      id,
      page,
      pageNum
    }
  })
}

// 获取用户的所有博客文章
export function getAllpagination(id) {
  return request({
    url: '/article/Allpagination',
    method: 'get',
    params: {
      id
    }
  })
}

// 修改博客信息
export function updataBlog(blogObj) {
  return request({
    url: '/article/updataBlog',
    method: 'post',
    data: {
      blog: blogObj
    }
  })
}

export function delBlog(id) {
  return request({
    url: '/article/delBlog',
    method: 'post',
    data: {
      id
    }
  })
}

// 点赞处理
export function pollCount(id, userId){
  return request({
    url: '/article/pullBlog',
    method: 'post',
    data: {
      id,
      userId
    }
  }) 
}

// 取消点赞
export function updataCount(id, userId){
  return request({
    url: '/article/updataPoll',
    method: 'post',
    data: {
      id,
      userId
    }
  }) 
}

// 通过分类获取想要的数据
export function getcategoryList(id){
  return request({
    url: '/article/categoryList',
    method: 'get',
    params: {
      id
    }
  })
}
// 通过 title 查找想要的数据
export function findList(title) {
  return request({
    url: '/article/findList',
    method: 'get',
    params: {
      title
    }
  })
}

// 获取热门阅读文章
export function getMoreList(){
  return request({
    url: '/article/moreList',
    method: 'get'
  })
}
