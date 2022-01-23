var express = require('express');
var router = express.Router();
const crypto = require("crypto")

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
        create: Date.now()
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
          mag: "注册失败"
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




module.exports = router;
