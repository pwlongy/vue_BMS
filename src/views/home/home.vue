<template>
  <div class="home">
    <div class="bg"></div>
      <div class="main">
        <div class="list">
          <div class="left">
            <blogList :blogList="Blogs"/>
          </div>
          <div class="right">
            <information/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
let blogList = () => import("../main/blogList.vue")
let information = () => import("@/components/module/Information.vue")

import {getBlog} from 'utils/archcle'

export default {
  components: {
    blogList,
    information
  },
  data() {
    return {
      value: "",
      // 博客列表
      Blogs: []
    }
  },
  created() {
    getBlog().then(res => {
      console.log(res)
      this.Blogs = res.data
    })
  }
}
</script>

<style scoped lang="scss">
.home{
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
      }
      .right{
        flex: 1;
      }
    }
   
  }
}
</style>