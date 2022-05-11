import { request } from "./axios";

// 获取评论信息
export function getComments(msgId){
  return request({
    url: '/comment/getcomments',
    params: {
      id: msgId
    }
  })
}

// 发布评论
export function pullcomment(commentsObj) {
  return request({
    url: '/comment/pullComments',
    method: "post",
    data: commentsObj
  })
}

// 删除评论
export function delComment(commentId, userId){
  return request({
    url: '/comment/delComment',
    method: "post",
    data: {
      user_id: userId,
      comment_id: commentId
    }
  })
}
