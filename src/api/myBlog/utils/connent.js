// 连接 mongodb 数据库
let mongoose = require("mongoose")

// 连接数据库
mongoose.connect('mongodb://localhost/myblog', {   // 注意更改数据库名称
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let conn = mongoose.connection
conn.on('erron', (err)=>{
  console.log("数据库连接失败", err)
})

conn.on("open", () =>{
  console.log('数据库连接成功')
})
