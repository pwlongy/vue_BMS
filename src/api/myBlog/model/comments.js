const mongoose = require("mongoose")
const article = require("./article")

const commentSchema = new mongoose.Schema({
  // 评论时间
  time: Date,
  // 评论内容
  content: {
    type: String,
    required: [true, "评论内容不能为空"]
  },
  // 评论人id
  user_id: {
    type: String
  },
  // 文章id
  article_id: {
    type: String
  },
  // 父级评论id
  father_comment: {
    type: String
  }
})

module.exports = mongoose.model("Comments", commentSchema)