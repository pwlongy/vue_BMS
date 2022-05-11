const mongoose = require("mongoose")


let ArticleSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: [true, "博客标题为必填项"]
  },
  // 用户id
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "用户id为必填项"],
    ref: "Users"
  },
  // 文章头部图片
  title_img: {
    type: String
  },
  // 概述
  overview: {
    type: String,
    required: [true, "概述为必填选项"] 
  },
  // 文章内容
  content: {
    type: String,
    required: [true, "内容为必填项"]
  },
  // 创建时间
  create_time: Date,
  // 最后修改时间
  update_time: Date,
  // 分类id
  class_id: {
    type: mongoose.Schema.ObjectId,
    require: [true, "分类id为必填项"],
    ref: 'Categorys'
  },
  // 点赞数
  poll_count: Array,
  // 评论数
  comment_count: Number,
  // 标签
  tags: {
    type: mongoose.Schema.ObjectId,
    require: [true, "标签类型为必选类型"],
    ref: "Tags"
  },
  // 阅读数量
  read_count: Number

})

module.exports = mongoose.model("Articles", ArticleSchema)

