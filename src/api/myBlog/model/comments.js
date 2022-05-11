const mongoose = require("mongoose")

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
    type: mongoose.Schema.ObjectId,
    // required: [true, "评论id不能为空"],
    ref: 'Users',
  },
  // 文章id
  article_id: {
    type:  mongoose.Schema.ObjectId,
    required: [true, "文章id不能为空"]
  },
  // 父级评论id
  father_comment: {
    type: String,
    default: ""
  }
})

module.exports = mongoose.model("Comments", commentSchema)