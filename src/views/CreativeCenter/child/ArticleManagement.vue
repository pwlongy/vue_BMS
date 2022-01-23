<template>
  <div class="ArticleManagement">
    <div class="title">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">文章</el-menu-item>
        <el-menu-item index="2">草稿箱(0)</el-menu-item>
      </el-menu>
    </div>
    
    <div class="content">
       <ul>
        <li>
          <h1>标题</h1>
          <div class="footer">
            <span>2021-11-18</span>
            <p>0 展现 1 阅读 0 点赞 0 评论 0 收藏</p>
          </div>
          <el-popover
            placement="bottom"
            width="80"
            popper-class="iClick"
            trigger="hover" >
            <ul>
              <li>编辑</li>
              <li>删除</li>
            </ul>
            <i class="iconfont icon-qita" slot="reference"></i>
          </el-popover>
        </li>
      </ul>
    </div>

   
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: "1",
    }
  },
  methods: {
    handleSelect(){

    }
  }
}
</script>

<style lang="scss" scoped>
.ArticleManagement{
  background: #fff;
  min-height: 820px;
  .title{
    height: 70px;
    border-bottom: 1px solid #e6e8eb;
    .el-menu{
      height: 70px;
      .el-menu-item{
        height: 100%;
        font-size: 18px;
        margin-right: 20px;
      }
    }
  }
  .content{
    width: 100%;
    ul{
      margin-top: 10px;
      li{
        display: block;
        height: 118px;
        padding: 0 25px;
        border-bottom: 1px solid #e5e6eb;
        padding-top: 32px;
        position: relative;
        h1{
          font-size: 18px;
          font-weight: 600;
        }
        .footer{
          display: flex;
          margin-top: 20px;
          font-size: 16px;
          color: #86909c;
          span{

          }
        }
        &>span{
          position: absolute;
          top: 32px;
          right: 25px;
        }
        &>.iconfont{
            font-size: 30px;
            color: #4e5969;
        }
      }
      li:hover{
        background: #fafafa;
        cursor: pointer;
      }
    }
  }
}
</style>