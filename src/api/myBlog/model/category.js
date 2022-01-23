const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "文章分类表名为必填项"]
  }
})

module.exports = mongoose.model("Categorys", categorySchema)