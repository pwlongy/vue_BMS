<template>
  <div class="header" ref="header">
    <div class="logo"></div>
    <div class="main">
      <!-- 搜索框 -->
      <el-input 
        placeholder="请输入内容" 
        v-model="input" 
        @change="changeinput"
        class="input-with-select"
        prefix-icon="el-icon-search">
      </el-input>
      
      <!-- 导航 -->
      <el-menu 
        :default-active="activeIndex" 
        class="el-menu-demo" 
        mode="horizontal"
        menu-trigger="click"
        @select="handleSelect"
        router
        >
        <el-menu-item index="1" route="/home">首页</el-menu-item>
        <el-menu-item index="2" route="/archive">归档</el-menu-item>
        <el-menu-item index="3" route="/label">标签</el-menu-item>
        <el-menu-item index="4" route="/note">笔记</el-menu-item>
        <el-menu-item index="6" route="/tourism">旅程</el-menu-item>
        <el-menu-item index="7" route="/login" class="avatar" v-if="!avater" >
           <el-avatar :size="35" ></el-avatar>
           未登录
        </el-menu-item>
        <el-submenu index="8" v-else>
          <template slot="title">
            <el-avatar :size="35" :src="avater"></el-avatar>
          </template>
          <el-menu-item index="8-1" route="/CreativeCenter">个人信息</el-menu-item>
          <el-menu-item index="8-2" route="/create">写文章</el-menu-item>
          <el-menu-item index="8-2" route="/login" @click="loginOut">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',

      // 导航
      activeIndex: '1',
      // 头像图片
      avater: ''
    }
  },
  created() {
    this.avater = JSON.parse(sessionStorage.getItem('user')).avatar || ''
  },
  mounted() {
    let path = this.$route.path
    if(path == '/home'){
      this.$refs.header.style.background = "transparent"
    }
  },
  components: {

  },
  methods: {
    handleSelect(){
      
    },
    // 退出登录
    loginOut(){
      sessionStorage.removeItem('user')
    },
    // 确定输入内容
    changeinput(){
      this.$emit("changeinput", this.input)
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    width: 1920px;
    height: 72px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: right;
    z-index: 100;
    background: #fff;
    .logo{

    }
    .avatar{
      color: rgb(175, 164, 164) !important; 
    }
    .main{
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      ::v-deep .el-input{
        margin-right: 20px;
        width: 240px;
        height: 40px;
        font-size: 15px;
        &>.el-input__inner{
          border-radius: 20px;
        }
        .el-icon-search{
          font-weight: 800 !important;
          font-size: 17px;
        }
      }

      // 导航
      .el-menu{
        height: 40px;
        background: transparent;
        border-bottom: 0;
        .el-menu-item.is-active {
          background-color: transparent !important;
          span {
            color: black !important;
          }
        }
        .el-submenu{
          color: #fff;
        }
        .el-menu-item, .el-submenu{
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          padding: 0;
          margin: 0 20px;
          ::v-deep .el-submenu__title{
            height: 40px;
            line-height: 40px;
          }
            color: rgb(0, 0, 0);
            span {
              color: rgb(0, 0, 0) !important;
            }
        }
        .el-menu-item:hover {
          background: transparent;
        }
        .el-submenu:hover{
          background: transparent !important;
        }
      }
    }
  }
</style>