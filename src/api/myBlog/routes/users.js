var express = require('express');
var router = express.Router();

const crypto = require("crypto")
const multer = require("multer")
const path = require("path")

const user =  require("../model/user");
// 注册用户
router.post('/regist', function(req, res) {
  console.log(req.body)
  // 通过用户名查找
  user.findOne({
    username: req.body.username
  })
  .then(data => {
    if(!data){
      // 没有查询到用户名执行注册功能
      user.create({
        username: req.body.username,
        password: crypto.createHash("sha256").update(req.body.password).digest("hex"),
        create: Date.now(),
        avatar: "/avatar/boy.jpg",
        followers: [],
        fans: []
      })
      .then( () => {
        // 注册成功
        res.send({
          code: 2000,
          mag: '注册成功'
        })
      })
      .catch( err => {
        res.send({
          code: 2001,
          mag: "注册失败"+err
        })
      })
    }else{
      // 用户名存在
      res.send({
        code: 3000,
        mag: "用户名已存在"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.send({
      code: 5000,
      msg: "服务器错误"
    })
  })
});


// 登录接口
router.post("/login", (req, res) => {
  user.findOne({
    username: req.body.username,
    password: crypto.createHash("sha256").update(req.body.password).digest("hex")
  })
  .then(data => {
    // console.log(data.create.getTime())
    // 设置session 
    req.session.isLogin = true

    if(data) {
      // 查询到数据
      res.send({
        code: 2000,
        msg: "登录成功",
        data
      })
    }else{
      res.send({
        code: 2001,
        msg: "用户名或密码错误"
      })
    }
  })
})

// 上传图片
// 配置文件上传
const storage = multer.diskStorage({
  // 配置文件存储目录
  destination: function(req, res, cb){
    cb(null, path.join(__dirname, "../public/avatar"))
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
    cb(null, /.(jpe?g|png|gif|webp)/i.test(file.originalname))
    // // 拒绝这个文件，使用`false`，像这样:
    // cb(null, false)

    // // 接受这个文件，使用`true`，像这样:
    // cb(null, true)
  }
}).single("photo")

// 上传用户头像
router.post("/pullImg", (req, res) => {
  // console.log(req.session.isLogin)
  // 判断是否登录
  if(req.session.isLogin){
    // 执行上传文件的操做
    upload(req, res, function(err) {
      console.log(req.file)
      if(err){
        console.log(err)
        res.send({
          code: 5000,
          msg: '文件上传失败'
        })
      }else{
        // 执行文件上传操做
        res.send({
          code: 2000,
          msg: '文件上传成功',
          data: req.file.filename
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

// 修改用户基本信息
router.post("/updataUser", (req, res) => {
  if(req.session.isLogin){
    let users = req.body.user
    // 判断修改的信息是否存在
    user.updateOne({_id: users.id}, {$set: {
      username: users.username,
      sex: users.sex,
      content: users.content,
      avatar: users.avatar
    }})
      .then(() => {
        res.send({
          code: 200,
          mag: '修改成功'
        })
      })
      .catch(err => {
        console.log(err)
      })
  }else {
    res.send({
      code: 5001,
      msg: '用户未登录, 请登录后操作'
    })
  }
})

// 关注
router.post('/followerMan', (req, res) => {
  console.log(12345678978878897, req.body)
  if(req.session.isLogin){
    // 添加粉丝
    user.updateOne({_id: req.body.id}, {$addToSet: {fans: req.body.userId}})
      .then(() => {
        // 添加追随者
        user.updateOne({_id: req.body.userId}, {$addToSet: {followers: req.body.id}})
          .then(() => {
            res.send({
              code: 200,
              mag: '关注成功'
            })
          })
        
      })
      .catch(err => {
        console.log(err)
      })
  }else{
    res.send({
      code: 5001,
      msg: '用户未登录，请登陆后执行操作'
    })
  }
})

// 取消关注
router.post('/updatafollowerMan', (req, res) => {
  if(req.session.isLogin){
    user.updateOne({_id: req.body.id}, {$pull: {fans: req.body.userId}})
      .then((data) => {

        console.log(data,123456789)
        user.updateOne({_id: req.body.userId}, {$pull: {followers: req.body.id}})
          .then(() => {
            res.send({
              code: 200,
              mag: '取消关注成功'
            })
          })
       
      })
      .catch(err => {
        console.log(err)
      })
  }else{
    res.send({
      code: 5001,
      msg: '用户未登录，请登陆后执行操作'
    })
  }
})

// 查找用户基本信息
router.get("/getuserMsg", (req, res) => {
  if(req.session.isLogin){
    user.findOne({_id: req.query.id})
      .then(data => {
        res.send({
          code: 200,
          msg: '获取数据成功',
          data
        })
      })
  }else{
    res.send({
      code: 5001,
      msg: '用户未登录请登录后执行操作'
    })
  }
})


module.exports = router;
