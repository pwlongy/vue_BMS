<template>
  <div class="archive">
    <div class="left">
      <img src="~/assets/bg/323909.jpg"/>
    </div>
    <div class="right">
        <el-timeline>
          <el-timeline-item placement="top" 
          v-for="(item, index) in blogList" 
          :key="index"  
          :timestamp="item.updata_time || item.create_time"
          @click="changPage(item._id)">
   
              <h4>{{item.title}}</h4>
              <p>{{username}} 提交于 {{item.create_time}}</p>
  
          </el-timeline-item>
        </el-timeline>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1,10]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageSize">
            </el-pagination>
          </div>
    </div>
  </div>
</template>

<script>
import {getUserBlog} from 'utils/archcle.js'

export default {
  data() {
    return {
      // 数据总条数
      pageSize: 0,
      currentPage: 1,
      // 每页条数
      pageNum: 1,
      // 用户信息
      userId : '',
      username: '',
      // 博客数据
      blogList: []
    }
  },
  created() {
    // 获取用户id
    this.userId = JSON.parse(sessionStorage.getItem('user'))._id
    this.username = JSON.parse(sessionStorage.getItem('user')).username
    console.log(this.userId)
    this.getBlog()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 修改每页条数
      this.pageNum = val
      this.getBlog()

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getBlog()
    },
    // 获取个人文章数据
    getBlog() {
      getUserBlog(this.userId, this.currentPage-1, this.pageNum)
        .then(res => {
          console.log(res)
          this.blogList = res.data
          this.pageSize = res.count
        })
    },
    changPage(id){
      console.log(123456789)
      this.$router.push("/detai?"+ id)
    }
  }
}
</script>

<style scoped lang="scss">
  .archive{
    height: calc(100vh - 72px);
    width: 1920px;
    display: flex;
    .left{
      width: 700px;
      height: 100%;
      background: coral;
      overflow: hidden;
      position: relative;
      img{
        height: 100%;
        position: absolute;
        left: -100px;
      }
    }
    .right{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .el-timeline{
        width: 600px;
        min-height: 700px;
      }
      .block{
        margin-top: 10px;
      }
      
    }
  }
</style>