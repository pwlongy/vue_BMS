const express = require("express")

const router = express.Router()

const tag = require("../model/tag")

// 获取所有标签
router.get("/getTags", (req, res) => {
  if(req.session.isLogin){
    tag.find({})
    .then(data => {
      res.send({
        code: 2000,
        msg: '标签数据获取成功',
        data
      })
    })
    .catch(err => {
      res.send({
        code: 5000,
        msg: "服务器错误"+err
      })
    })
  }else{
    res.send({
      code: "4001",
      msg: "用户未登录，请登陆后在执行操作"
    })
  }

})

// 添加标签
router.post("/addTag", (req, res) => {
  if(req.session.isLogin){
    // 查询标签名字是否已经添加过了
    tag.findOne({name: req.body.tagName})
      .then(data => {
        // 没有查询到数据
        // console.log(data)
        console.log(req.body)
        if(!data){
          // 创建标签
          tag.create({
            name: req.body.tagName
          })
          .then(() => {
            res.send({
              code: 2000,
              msg: "tag标签添加成功"
            })
          })
          .catch(err => {
            res.send({
              code: 5000,
              msg: "服务器错误"+err
            })
          })
        }else{
          // 标签已存在
          res.send({
            code: 3000,
            msg: '标签已存在'
          })
        }
      })

  }else{
    res.send({
      code: 4001,
      msg: "用户为登录,请登陆后在执行操作"
    })
  }
})

module.exports = router


