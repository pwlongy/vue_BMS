const express = require("express")
const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const router = express.Router()
const article = require("../model/article")

// 发布博客
router.post("/creatArticle", (req, res) => {
  console.log(req.body)
  // 检测用户是否登录
  if(req.session.isLogin){
    // 用户已登录
    // 执行发布博客操作
    article.create({
      title: req.body.title,
      title_img: req.body.titleImg ?  req.body.titleImg : '',
      user_id: req.body.userId,
      content: req.body.content,
      overview: req.body.overview,
      create_time: Date.now(),
      poll_count: [],
      comment_count: 0,
      read_count: 0,
      class_id: req.body.classId,
      tags: req.body.tags
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
  console.log(req.params)
  article.find({}).sort({create_time: -1})
  .then(data => {
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

// 通过id查找博客
router.get("/getBlogForId", (req, res) => {
  let id = req.query.id
  console.log(12345687979797979, req.query)
  article.findOne({_id: id})
    .populate("user_id")
    .populate("class_id")
    .populate("tags")
    .then(data => {
      // 访问成功一次添加一次访问记录
      article.updateOne({_id: id}, {$set:{read_count: ++data.read_count}})
        .then(() => {
          res.send({
            code: 2000,
            msg: '数据查找成功',
            data
          })
        })
        .catch(err => {
          console.log(err)
        })

    })
    .catch(err => {
      console.log(err)
      res.send({
        code: 5000,
        msg: "服务器错误"+ err
      })
    })
})

// 点赞
router.post('/pullBlog',(req, res) => {
  console.log(1234567899999999, req.body)
  if(req.session.isLogin){
        article.updateOne({_id:  req.body.id}, {$addToSet: {poll_count:req.body.userId}})
          .then(() => {
            res.send({
              code: 200,
              msg: '点赞成功'
            })
          })
          .catch(err => {
            console.log(err)
          })
  }else{
    res.send({
      code: 5001,
      msg: '用户未登录，请登录后执行操作'
    })
  }
})

// 取消点赞
router.post('/updataPoll' ,(req, res) => {
  if(req.session.isLogin){
    article.updateOne({_id: req.body.id}, {$pull: {poll_count: req.body.userId}})
      .then(() => {
        res.send({
          code: 200,
          message: '取消成功'
        })
      })
  }else {
    res.send({
      code: 5001,
      msg: '用户未登录'
    })
  }
})

// 通过id去删除博客信息
router.post('/delBlog', (req, res) => {
  // 判断用户是否登录
  if(req.session.isLogin){
    // 执行删除操作
    article.deleteOne({_id: req.body.id})
      .then( () => {
        res.send({
          code: 200,
          msg: "执行操作成功"
        })
      })
      .catch( err => {
        res.send({
          code: 500,
          msg: "服务器错误",
          data: err
        })
      })
  }else {
    res.send({
      code: 4001,
      msg: "用户未登录，请登录后执行操作"
    })
  }
})

// 修改博客信息
router.post('/updataBlog', (req, res) => {
  if(req.session.isLogin){  
    let blog = req.body.blog
    article.updateOne({_id: blog.id}, {$set: {
      title: blog.title,
      title_img: blog.title_img || '',
      overview: blog.overview,
      content: blog.content,
      update_time:  Date.now(),
      class_id: blog.classId,
      tags: blog.tags
    }})
      .then((data) => {
        console.log(data)
        res.send({
          code: 200,
          msg: '修改数据成功'
        })
      })
      .catch(err => {
        console.log(err)
      })
  }else{
    res.send({
      code: 4001,
      msg: '用户未登录，请登录后操作'
    })
  }
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
    cb(null, /.(jpe?g|png|gif|webp)/i.test(file.originalname))
    // // 拒绝这个文件，使用`false`，像这样:
    // cb(null, false)

    // // 接受这个文件，使用`true`，像这样:
    // cb(null, true)
  }
}).single("photo")


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

// 分页查找博客
router.get("/pagination", async (req, res) =>{
  // console.log(req.query)
  
  let pageNum = Number(req.query.pageNum) || 10
  let numberBar = req.query.page * pageNum
  console.log(111,numberBar, pageNum)
  let id  = req.query.id
  let count
  // 获取用户总共条数
  await article.find({user_id: id})
    .then(data => {
      count = data.length
    })
  // let totle = article.find()
  article.find({user_id: id}).skip(numberBar).limit(pageNum).exec()
    .then(data => {
      
      res.send({
        code: 200,
        msg: '获取数据成功',
        data,
        count
        // totle
      })
    })
})


// 查找用户发布的所有博客
router.get("/Allpagination", async (req, res) =>{
  // console.log(req.query)
  let id  = req.query.id
  // let totle = article.find()
  article.find({user_id: id})
    .then(data => {
      res.send({
        code: 200,
        msg: '获取数据成功',
        data,
        // totle
      })
    })
    .catch(err => {
      console.log(err)
    })
})



// 通过分类查找博客
router.get("/categoryList", (req, res) => {
  let categoryListId = req.query.id
  article.find({class_id: categoryListId})
    .then(data => {
      res.send({
        code: 200,
        msg: '分类数据获取成功',
        data
      })
    })
    .catch(err => {
      console.log(err)
    })
}) 

// 通过 标题模糊搜索
router.get('/findList', (req, res) => {
  let title = req.query.title
  // console.log(title)
  article.find({title: new RegExp(title)}).sort({create_time: -1})
    .then(data => {
      res.send({
        code: 200,
        msg: '模糊查询成功',
        data
      })
    })
    .catch(err => {
      console.log(err)
    })
})

// 查询浏览数量最多的5条
router.get("/moreList",(req, res)=> {
  article.find().sort({read_count: -1}).limit(5)
    .then(data => {
      res.send({
        code: 200,
        msg: '推荐阅读查询成功',
        data
      })
    })
})


module.exports = router