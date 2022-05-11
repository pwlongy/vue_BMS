<template>
  <div class="label">
    <!-- 所有标签 -->
    <div class='allCategory'>
      <div class="categoryitem"
        v-for="(item, index) in CategoryList" 
        :key="index"
        :class="item.isActive ? 'active' : ''"
        @click="changeCategory(item._id, index)">
        {{item.name}}
      </div>
    </div>

    <!-- 博客列表 -->
    <div class="blogs">
       <blogList  :blogList="Blogs" v-if="Blogs.length != 0"></blogList>
    </div>
   
  </div>
</template>

<script>
import {getCategory} from "@/utils/category"
let blogList = () => import("../main/blogList.vue")
import {getBlog, getcategoryList} from 'utils/archcle'
export default {
  data() {
    return {
      // 标签列表
      CategoryList : [],
      // 博客列表
      Blogs: []
    }
  },
  components: {
    blogList
  },
  created() {
    // 获取所有标签
    getCategory()
      .then(res => {
        console.log(res)
        res.data.forEach(item => {
          item.isActive = false
        });
        res.data.unshift({
          name: '全部',
          _id: '',
          isActive: true
        })
        this.CategoryList = res.data
      })
      .catch(err => {
        console.log(err)
      })
    
    // 默认获取全部数据
     getBlog().then(res => {
      console.log(res)
      this.Blogs = res.data
    })
  },
  methods: {
    // 获取标签博客列表
    changeCategory(id, index) {
      // 修改选中状态
      this.CategoryList.forEach(item => {
        item.isActive = false
      })
      this.CategoryList[index].isActive = true

      getcategoryList(id)
        .then(res => {
          console.log(res)
          this.Blogs = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.label{
  background: #eee;
  min-height: 100%;
  padding-top: 20px;
  .allCategory{
    background: #fff;
    padding: 0 15px;
    border-radius: 10px;
    width: 1000px;
    min-height: 100px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;
    .categoryitem{
      cursor: pointer;
      margin:5px 5px;
      line-height: 20px;
      height: 30px;
      padding: 5px 10px;
      border: 1px solid #eee;
      border-radius: 5px;
      border: 1px solid #eee;
    }
    .active{
      background: rgba(75, 150, 102, 0.533);
    }
  }

  .blogs{
    padding-top: 20px;
    width: 1000px;
    margin: 0 auto;
  }
}
</style>