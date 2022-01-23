const express = require("express")
const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const router = express.Router()
const article = require("../model/article")

// 发布博客
router.post("/creatArticle", (req, res) => {
  console.log(req.body)
  console.log(req.session.isLogin)
  // 检测用户是否登录
  if(req.session.isLogin){
    // 用户已登录
    // 执行发布博客操作
    article.create({
      title: req.body.title,
      user_id: req.body.userId,
      content: req.body.content,
      overview: req.body.overview,
      create_time: Date.now(),
      poll_count: 0,
      comment_count: 0
    })
    .then(() => {
      res.send({
        code: 2000,
        msg: '文章发表成功'
      })
    })
    .catch(err => {
      console.log(err)
      res.send({
        code: 5000,
        msg: '服务器错误'
      })
    })

  }else{
    res.send({
      code: 4001,
      msg: "用户未登录，请登录后执行操做"
    })
  }


 
})

//查找博客
router.get("/getBlog", (req, res) => {
  console.log(123)
  article.find({})
  .then(data => {
    console.log(data)
    // 查找成功
    res.send({
      code: 2000,
      msg: '博客查找成功',
      data
    })
  })
  .catch(err => {
    console.log(err)
    res.send({
      code: 5000,
      msg: '服务器未响应'
    })
  })
})

// 上传图片
// 配置文件上传
const storage = multer.diskStorage({
  // 配置文件存储目录
  destination: function(req, res, cb){
    cb(null, path.join(__dirname, "../public/images"))
  },
  // 配置文件存储名字
  filename: function(req, file, cb){
    let filename =  crypto.createHash("sha256").update(file.originalname+Date.now()).digest("hex")+file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, filename)
  }
})
// 规定上传文件的格式
let upload = multer({
  // 存储在数据库中
  storage: storage,
  fileFilter(req, file, cb){    // 文件过滤
    // console.log(file)
    cb(null, /.(jpe?g|png|gif|webp)/.test(file.originalname))


    // // 拒绝这个文件，使用`false`，像这样:
    // cb(null, false)

    // // 接受这个文件，使用`true`，像这样:
    // cb(null, true)
  }
}).single("photo")


router.post("/pullImg", (req, res) => {
  console.log(req.session.isLogin)
  // 判断是否登录
  if(req.session.isLogin){
    // 执行上传文件的操做
    upload(req, res, function(err) {
      console.log(err)
      if(err){
        res.send({
          code: 5000,
          msg: '文件上传失败'
        })
      }else{
        // 执行文件上传操做
        res.send({
          code: 2000,
          msg: '文件上传成功'
        })
      }
    })
  }else{
    res.send({
      code: 4001,
      msg: "未登录，请登陆后执行操做"
    })
  }
})


module.exports = router