<template>
  <div class="center">
    <Top/>
    <div class="main">
      <div class="menu">
            <!-- 用户基本信息 -->
            <div class="userMsg">
               <el-avatar :size="60" :src="user.avatar"></el-avatar>
              <span>{{user.username}}</span>
            </div>
            <div class="write">
              <button @click="pageChange">写文章</button>
            </div>

          
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              router>
              <el-menu-item index="1" route="/">
                <i class="iconfont icon-shouyetianchong"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="2" route="/CreativeCenter/userMsg">
                <i class="iconfont icon-shouyetianchong"></i>
                <span slot="title">个人基本信息</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont icon-shuju9"></i>
                  <span>内容管理</span>
                </template>
                <el-menu-item index="3-1" route="/CreativeCenter/ArticleManagement">文章管理</el-menu-item>
                <!-- <el-menu-item index="2-2">专栏管理</el-menu-item>
                <el-menu-item index="2-3">沸点管理</el-menu-item> -->
              </el-submenu>
               <el-submenu index="4">
                <template slot="title">
                  <i class="iconfont icon-shuju9"></i>
                  <span>关注</span>
                </template>
                <el-menu-item index="4-1" route="/CreativeCenter/concern">关注者</el-menu-item>
                <el-menu-item index="4-1" route="/CreativeCenter/fans">粉丝</el-menu-item>
                <!-- <el-menu-item index="2-2">专栏管理</el-menu-item>
                <el-menu-item index="2-3">沸点管理</el-menu-item> -->
              </el-submenu>
              <!-- <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont icon-shuju"></i>
                  <span>数据中心</span>
                </template>
                <el-menu-item index="3-1">内容数据</el-menu-item>
                <el-menu-item index="3-2">关注者数据</el-menu-item>
                <el-menu-item index="3-3">沸点管理</el-menu-item>
              </el-submenu> -->
             
            </el-menu>
      </div>
      

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>  
</template>

<script>
let Top = () => import("@/components/common/top/header.vue")
export default {
  data () {
    return {
      circleUrl: '',
      // 用户基本信息
      user: {}
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('user')) 
  },
  methods:{
    pageChange() {
      // 页面的跳转
      this.$router.push('/create')
    }
  },
  components: {
    Top
  }
}
</script>

<style lang="scss" scoped>
  .center{
    background: #f4f5f5;
    min-height: 100%;
    padding-bottom: 30px;
    .main{
      width: 1500px;
      margin: auto;
      margin-top: 30px;
      display: flex;
      .menu{
            background: #fff;
            height: 820px;
            width: 300px;
            .userMsg{
              padding-left: 21px;
              height: 120px;
              display: flex;
              align-items: center;
              span{
                display: block;
                margin-left: 16px;
                font-size: 18px;
                font-weight: 500;
              }
            }

            .write{
              padding: 0 21px;
              button{
                width: 100%;
                height: 44px;
                line-height: 44px;
                text-align: center;
                margin-top: 20px;
                margin-bottom: 30px;
                background: #1d7dfa;
                color: #fff;
                font-size: 16px;
                border-radius: 6px;
              }
            }

            .el-menu{
              height: 600px;
              font-size: 20px;
              overflow-y: scroll;
              border-right: none;
              .iconfont{
                font-size: 18px;
              }
              span{
                display: inline-block;
                font-size: 18px;
                margin-left: 14px;
              }
              .el-submenu{
                .el-menu-item{
                  color: #86909c;
                  font-size: 18px;
                }
              }
            }
            .el-menu::-webkit-scrollbar {
                width: 4px;    
                /*height: 4px;*/
            }
            .el-menu::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: rgba(0,0,0,0.2);
            }
            .el-menu::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px transparent;
                border-radius: 0;
                background: transparent;

            }
      }
      .content{
        width: 1170px;
        margin-left: 30px;
      }
    }
    
  }
</style>