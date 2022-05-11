const express = require("express")
const mongoose = require("mongoose")

const router = express.Router()

const comment = require("../model/comments")

// 发表评论
router.post("/pullComments", (req, res) => {
  // 判断用户是否登录
  console.log(req.body)
  if(req.session.isLogin){
    // 已成功登录， 执行发表评论操做
    comment.create({
      time: Date.now(),
      content: req.body.content,
      user_id: mongoose.Types.ObjectId(req.body._id),
      article_id: mongoose.Types.ObjectId(req.body.article_id),
      father_comment: req.body.father_comment?mongoose.Types.ObjectId(req.body.father_comment): '',
    })
    .then(() => {
      res.send({
        code: 2000,
        msg: '评论成功'
      })
      // 添加评论数量
      
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
      msg: '用户未登录，请登录后执行操做'
    })
  }
})

// 获取评论
router.get("/getcomments", (req, res) => {
  let id = mongoose.Types.ObjectId(req.query.id)
  if(!id){
    console.log("id不存在")
    res.send({
      code: 5000,
      msg: "服务器错误"
    })
    return
  }
  comment.find({
    article_id: id
  })
  .populate("user_id")
    .then( data => {
      res.send({
        code: 2000,
        msg: "评论数据获取成功",
        data
      })
    })
    .catch( err => {
      console.log(err),
      res.send({
        code: 5000,
        msg: '服务器错误'
      })
    })
})

// 删除评论
router.post("/delComment", (req, res) => {
  let user_id = req.body.user_id
  let comment_id = req.body.comment_id
  console.log(comment_id)
  // 获取需要删除的 id
  // 指定的id才能删除评论
  // 判断是否是自己发送的评论
  // 通过评论id 查找评论信息
  comment.findOne({_id: comment_id})
    .then(data => {
      if(data){
        // 存在评论
        console.log(data)
        // 判断是否为自己发送的
        if(user_id == data.user_id){
          // 执行删除评论操作
          comment.remove({
            _id: comment_id
          })
          .then(() => {
            res.send({
              code: 2000,
              msg: "评论删除成功"
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
            code: 4000,
            msg: "您没有权限删除此条评论"
          })
        }
      }else {
        // 没有查询到数据
        res.send({
          code: 5000,
          msg: '服务器错误'
        })
      }
    })
    .catch(err => {
      res.send({
        code: 5000,
        msg: "服务器错误"+ err
      })
    })
})


module.exports = router
