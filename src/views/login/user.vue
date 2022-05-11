<template>
  <div class="userMessage">
    <div class="top">
      <el-avatar :size="120" :src="avatar" shape='circle'></el-avatar>
      
      <el-upload
        class="upload-demo"
        action=""
        :http-request="uodataAcatar"
        :on-success="successSure"
        :on-error="errorSure"
        :on-preview="handlePreview">
        <span class="icontext" >更改头像</span>
      </el-upload>
    </div>
    <ul>
      <li>
        <span>昵称</span>
        <el-input v-model="username" placeholder="请输入内容" class="nickInput"></el-input>
      </li>
       <li>
        <span>性别</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="-1">保密</el-radio>
        </el-radio-group>
      </li>
       <li>
        <span>个人简介</span>
        <el-input
          class="textInput"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="textarea"/>
      </li>
    </ul>
    <span class="btnSuccess" @click="btnSuccess">保存</span>
  </div>
</template>

<script>
import {undataUser, updataUserAvatar} from 'utils/user.js'
export default {
  data() {
    return {
      avatar: '',
      // 昵称
      username: '',
      // 性别
      radio: '0',
      // 个人简介
      textarea: '',
      // 用户id
      id: ''
    }
  },
  created() {
    // 获取用户基本信息
    let user = JSON.parse(sessionStorage.getItem("user"))
    this.avatar = user.avatar
    this.username = user.username
    this.radio = user.sex || ''
    this.textarea = user.content || ''
    this.id = user._id
  },
  methods: {
    // 修改用户信息
    updata(){
      let user = {
        _id: this.id,
        username : this.username,
        content: this.textarea,
        sex: this.radio,
        avatar: this.avatar 
      }
      undataUser(user)
      .then(res => {
        console.log(res)
        // 修改sessionStorage数据
        sessionStorage.setItem('user', JSON.stringify(user))
        if(res.code == 200){
          this.$message({
            type: 'success',
            message: '数据修改成功'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 图片上传
    handlePreview() {
      console.log(123456789)
    },
    successSure() {
      this.$message({
        type: 'success',
        message: '头像更换成功'
      })
    },
    // 文件上传失败
    errorSure() {
      this.$message({
        type: 'error',
        message: "头像更换失败"
      })
    },
    // 更换头像
    uodataAcatar(data) {
      updataUserAvatar(data.file)
        .then(res => {
          console.log(res)
          if(res.code == 2000){
            this.avatar = '/images/' +res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 保存
    btnSuccess(){
      this.updata()
    }

  }
}
</script>

<style scoped lang="scss">
  .userMessage{
    padding: 20px 20px;
    background: #fff;
    .top{
      display: flex;
      align-items: center;
      .icontext{
        width: 105px;
        height: 38px;
        border-radius: 19px;
        border: 1px solid #42c02e;
        display: block;
        text-align: center;
        line-height: 38px;
        color: #42c02e;
        margin-left: 60px;
      }
    }
    ul {
      li{
        display: flex;
        padding: 24px 0;
        border-bottom: 1px solid #f0f0f0;
        span{
          width: 100px;
          flex-shrink: 0;
        }
        ::v-deep .nickInput{
          input{
            
            font-size: 18px;
            width: 300px;
            outline: none;
            background: #f7f7f7;
            border: 1px solid #c8c8c8;
          }
        }
        .el-radio-group{
          font-size: 18px;
        }
        ::v-deep .textInput{
          width: 400px;
          textarea{
            height: 200px !important;
            font-size: 18px;
            outline: none;
            background: #f7f7f7;
            border: 1px solid #c8c8c8;
          }
        }
      }
    }
    .btnSuccess{
      display: block;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      background: #42c02e;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>