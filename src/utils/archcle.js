import { request } from "./axios";

export function createBlog(blogObj){
  return request({
    url: '/article/creatArticle',
    method: 'post',
    data: {
      title: blogObj.title,
      userId: blogObj.user_id,
      content: blogObj.content,
      overview: blogObj.overview
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