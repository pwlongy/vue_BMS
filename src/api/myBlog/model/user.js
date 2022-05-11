const mongoose = require("mongoose")

let Schema = mongoose.Schema

let userSchema = new Schema({
  // 用户名
  username: {
    type: String,
    required: [true, "用户名为必填项"]
  },
  // 密码
  password: {
    type: String,
    required: [true, "密码为必填项"]
  },
  // 创建时间
  create: Date,
  nickname: String,
  tel: {
    type: String,
    minlength: [11, "电话号码的长度必须为11"],
    maxlength: [11, "电话号码的长度必须为11"],
    match: /^1[3|4|5|7|8]\d{9}$/
  },
  Email: {
    type: String,
    match: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  },
  avatar: {
    type: String
  },
  // 个性签名
  content: {
    type: String
  },
  // 性别
  sex: {
    type: [Number,String]
  },
  // 粉丝
  fans: Array,
  // 关注对象
  followers: Array
})

module.exports = mongoose.model("Users", userSchema)
