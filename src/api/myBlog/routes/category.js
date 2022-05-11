const express = require("express")

const router = express.Router()

const category = require("../model/category")

// // 使用中间件，当用户未登录的时候，不允许执行操作
let x =  (req, res, next)=> {
  if(!req.session.isLogin){
    res.send({
      code: 4001,
      msg: "用户未登录, 请登录后在执行操作"
    })
    // next()
  }else{
    next()
  }
}

// 获取所有分类
router.get("/getcategorys", (req, res) => {
  category.find({})
    .then(data => {
      res.send({
        code: 2000,
        msg: "分类获取成功",
        data
      })
    })
    .catch(err => {
      res.send({
        code: 5000,
        msg: "服务器错误"+err
      })
    })
})

// 添加分类
router.post("/addCategory", x, (req, res)=> {
  // 判断分类是否已经存在
  category.find({name: req.body.categoryName})
    .then(data => {
      console.log(data)
      if(data.length != 0){
        // 已存在
        res.send({
          code: 3000,
          msg: "分类已存在"
        })
      }else{
        // 执行添加操作
        category.create({
          name: req.body.categoryName
        })
        .then(() => {
          // 查询分类id
          category.findOne({
            name: req.body.categoryName
          })
          .then(data => {
            res.send({
              code: 2000,
              msg: "添加分类成功",
              data
            })
          })
         
        })
        .catch(err => {
          res.send({
            code: 5000,
            msg: "服务器错误"+err
          })
        })
      }
    })
})

module.exports = router