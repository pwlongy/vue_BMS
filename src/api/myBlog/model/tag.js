const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "tag名为必填项"]
  }
})

module.exports = mongoose.model("Tags", tagSchema)