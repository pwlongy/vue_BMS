<template>
  <div class="ArticleManagement">
    <div class="title">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">文章</el-menu-item>
        <!-- <el-menu-item index="2">草稿箱(0)</el-menu-item> -->
      </el-menu>
    </div>
    
    <div class="content">
       <ul>
         <!-- 循环遍历所有博客列表数据 -->
        <li v-for="(item, index) in blogList" :key="index" @click="changePage(item._id)">
          <h1>{{item.title}}</h1>
          <div class="footer">
            <span>{{item.create_time}}</span>
            <p> &nbsp;&nbsp;&nbsp;&nbsp;0 展现 {{item.read_count}} 阅读 {{item.poll_count.length}}点赞 {{item.poll_count.length}} 评论 0 收藏</p>
          </div>
          <el-popover
            placement="bottom"
            width="80"
            popper-class="iClick"
            trigger="hover" >
            <ul>
              <li @click="updataBlog(item._id)">编辑</li>
              <li @click="deleteBlog(item._id, index)">删除</li>
            </ul>
            <i class="iconfont icon-qita" slot="reference"></i>
          </el-popover>
        </li>
      </ul>
    </div>
     <el-dialog
    title="是否删除此篇文章"
    :visible.sync="dialogVisible"
    width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="suerDel">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import {getAllpagination, delBlog} from 'utils/archcle'
export default {
  data () {
    return {
      activeIndex: "1",
      // 用户发表的所有博客列表
      blogList: [],
      // id
      userId: '',
      // 模态框的显示与隐藏
      dialogVisible: false,
      // 需要删除文章的id
      blogId: '',
      // 删除第几行
      index: 0
    }
  },
  created() {
    // 获取用户id
    this.userId = JSON.parse(sessionStorage.getItem('user'))._id
    // 获取用户所有博客列表
    getAllpagination(this.userId)
      .then(res => {
        this.blogList = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleSelect(){

    },
    // 修改数据
    updataBlog(id) {
      // 跳转到修改博客信息页面
      this.$router.push('/create?id='+id)
    },
    deleteBlog(id, index) {
      this.dialogVisible = true
      this.blogId = id 
      this.index = index
    },
    suerDel() {
      console.log(this.blogId)
      this.dialogVisible = false
      // 执行删除命令
      delBlog(this.blogId)
        .then(res => {
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除数组一项
            this.blogList.splice(this.index, 1)
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.$message({
              type: 'err',
              message: '删除失败'
            });
        })
    },
    // 跳转页面
    changePage(id){
      this.$router.push("/detail/"+ id)
      console.log(id)
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