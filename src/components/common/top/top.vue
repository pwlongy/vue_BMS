<template>
  <div class="top">
    <main>
      <div class="main">
        <!-- 标题 -->
          <span class="active"><i class="iconfont icon-faxian "></i>发现</span>
          <span><i class="iconfont icon-friend"></i>IT技术</span>
          <span><i class="iconfont icon-neirong"></i>关注</span>
          <el-popover
            placement="bottom"
            width="248"
            popper-class= "popperMessage"
            trigger="hover">
            <ul>
              <li><i class="iconfont icon-xiaoxi"></i>评论</li>
              <li><i class="iconfont icon-youjian"></i>简信</li>
              <li><i class="iconfont icon-fasongzhi"></i>投稿请求</li>
              <li><i class="iconfont icon-xihuan1"></i>喜欢和赞</li>
              <li><i class="iconfont icon-wodeguanzhu"></i>关注</li>
              <li><i class="iconfont icon-dashang"></i>赞赏和付费</li>
              <li><i class="iconfont icon-qita"></i>其他提醒</li>
            </ul>
            <span slot="reference"><i class="iconfont icon-xiaoxi"></i>消息</span>
          </el-popover>
        <!-- 输入框 -->
        <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          clearable
          v-model="input">
        </el-input>
      </div>

      <!-- 登录注册 -->
      <div class="login" v-if="login">
        <span>登录</span>
        <span>注册</span>
      </div>

      <!-- <el-popover
        placement="bottom-start"
        width="400"
        trigger="focus"
        v-else> -->
        
         <!-- 用户信息 -->
       
      <!-- </el-popover> -->
        <el-popover
          placement="bottom"
          width="200"
          trigger="hover"
          popper-class="popoverUser"
          v-else>
          <ul>
            <li><i class="iconfont icon-wode"/>我的主页</li>
            <li><i class="iconfont icon-tubiao-shoucang"/>收藏的文章</li>
            <li><i class="iconfont icon-xihuan1"/>喜欢的文章</li>
            <li><i class="iconfont icon-gaiicon-"/>已购内容</li>
            <li><i class="iconfont icon-wodeqianbao1"/>我的钱包</li>
            <li><i class="iconfont icon-shezhi"/>设置</li>
            <li><i class="iconfont icon-bangzhuyufankui"/>帮助与反馈</li>
            <li><i class="iconfont icon-tuichu"/>退出</li>
          </ul>
          <div class="user" slot="reference">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-popover>

        
      <!-- 写文章 -->
      <u @click="creation"><i class="iconfont icon-line-quillpenyumaobi"></i>写文章</u>
    </main>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      login: false,
      circleUrl: ''
    }
  },
  methods: {
    creation(){
      this
    }
  }
}
</script>

<style lang="scss" scoped>
  .top{
    height: 70px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
    main{
      width: 1920px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .main{
        width: 1100px;
        margin-left: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        &>span{
          display: block;
          font-size: 20px;
          margin-right: 52px;
          cursor: pointer;
          i{
            display: inline-block;
            font-size: 20px;
            margin-right: 6px;
          }
        }
        .active{
          color: #ea6f5a;
        }

        // 输入框
        ::v-deep .el-input{
          width: 300px;
          height: 50px;
          display: block;
          line-height: 50px;
          input{
            border-radius: 25px;
             outline: none;
          }
        }

      
      }

      // 登陆注册
      .login{
        display: flex;
        span{
          display: block;
          font-size: 20px;
          line-height: 48px;
          height: 48px;
          width: 100px;
          border-radius: 25px;
          text-align: center;
          cursor: pointer;
        }
        span:nth-child(1){
          color: #969696;
        }
        span:nth-child(2){
          border: 1px solid #f2907f;
          color: #eb7561;
        }
      }


      // 用户信息
        .user{
          margin-left: 100px;
          display: flex;
          padding: 0 10px;
          align-items: center;
          i{
            display: block;
            margin-left: 5px;
            color: #999999;
          }
        }
      


      // 写文章
      &>u{
        font-size: 20px;
        background-color: #ea6f5a;
        color: #fff;
        height: 50px;
        line-height: 50px;
        width: 126px;
        text-align: center;
        border-radius: 25px;
        cursor: pointer;
        margin-left: 22px;
      }
    }
  }
</style>