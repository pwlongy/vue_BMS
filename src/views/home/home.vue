<template>
  <div class="home clear_fix">
    <div class="bg"></div>
      <div class="main clear_fix">
        <div class="list">
          <div class="left">
            <blogList :blogList="Blogs" v-if="Blogs.length != 0"/>
            <div class="datanull" v-else>
              <img src="~/assets/nullData.png">
              <span>未找到数据</span>
            </div>
          </div>
          <div class="right">
            <information/>
            <div class="tags">
              <span>分类</span>
              <tag-cloud :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
            </div>
            <div class="tags">
              <span>推荐文章</span>
              <div class="moreList">
                <div class="moreItem" @click="changedate(item._id)" v-for="(item, index) in moreList" :key="index">
                  <div>{{item.title}}</div>
                  <div class="icon">点赞{{item.poll_count.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浏览量 {{item.read_count}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
let blogList = () => import("../main/blogList.vue")
let information = () => import("@/components/module/Information.vue")

import {getBlog, getMoreList} from 'utils/archcle'
import {getCategory} from 'utils/category'
export default {
  components: {
    blogList,
    information
  },
  data() {
    return {
      value: "",
      // 博客列表
      Blogs: [],
      // 用户头像
      avater: '',
      hotTag: [],
      // 推荐文章
      moreList: []
    }
  },
  created() {
    getBlog().then(res => {
      console.log(res)
      this.Blogs = res.data
    })
    // 获取所有标签
    getCategory()
      .then(res => {
        console.log(res)
        this.hotTag = res.data
      })
    
    // 获取推荐文章
    getMoreList()
      .then(res => {
        console.log(res)
        this.moreList = res.data
      })
  },
  methods: {
    clickTagItem () {
      // TODO
    },
    changedate(id){
      this.$router.push("/detail/"+id)
    }
  },
  mounted () {
    this.event.$on("changeList", (res) =>{
      this.Blogs = res
      console.log(this.Blogs)
    })
  }
}
</script>

<style scoped lang="scss">
.home{
  background: #f4f4f4;
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    height: 800px;
    width: 1920px;
    margin: 0 auto;
    background-image: url("../../assets/bg/323416.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
  }
  
  .tags{
    background: #fff;
    margin-top: 10px;
    border-radius: 10px;
    span{
      display: flex;
      align-items: center;
      height: 40px;
      font-size: 18px;
      border-bottom: 1px solid #eee;
      &::before{
        content: '';
        display: block;
        width: 10px;
        height: 40px;
        background: rgb(112, 154, 182);
        border-radius: 5px;
        margin-right: 20px;
      }
    }

    .moreList{
      .moreItem{
        height: 100px;
        border-bottom: 1px solid #eee;
        padding:  5px 10px; 
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .icon{
          font-size: 14px;
          color: rgb(172, 169, 169);
        }
      }
    }
  }

  .main{
    background-color: #f4f4f4;
    padding-top: 40px;
    padding-bottom: 500px;
    margin-top: 700px;
    .list{
      width: 1440px;
      margin: 0 auto;
      display: flex;

      .left{
        width: 1062px;
        margin-right: 20px;
        .datanull{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 60%;
          }
          span{
            font-size: 22px;
            display: block;
          }
        }
      }
      .right{
        flex: 1;
      }
    }
   
  }
}
</style>