import { request } from "./axios";

// 获取所有分类名字
export function getCategory(){
  return request({
    url: '/category/getcategorys',
  })
}
// 获取所有标签名字
export function getTag() {
  return request({
    url: '/tag/getTags'
  })
}

// 添加分类名称
export function addCategory(name) {
  return request({
    url: '/category/addCategory',
    method: "post",
    data: {
      categoryName: name
    }
  })
}

// 添加分类名称
export function addTag(name) {
  return request({
    url: '/tag/addTag',
    method: "post",
    data: {
      tagName: name
    }
  })
}