<template>
    <div class="blog">
      <div class="blogItem" @click="jumpDetail(item._id)" v-for="(item, index) in blogList" :key="index">
        <img :src="item.title_img" v-if="item.title_img"/>
        <div class="right">
          <h1 v-text="item.title"></h1>
          <p v-text="item.overview"></p>
          <div>
            <span>{{item.create_time}}</span>
            <u>笔记</u>
            <label>顶置</label>
            <p><i class="iconfont icon-xiaoxi"></i>{{item.comment_count}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    blogList: {
      type: Array,
      // required: true
    }
  },
  methods: {
    jumpDetail(id) {
      this.$router.push("/detail/"+id)
    }
  },
  created() {
    console.log(this.blogList, 111111111)
  }
}
</script>

<style lang="scss" scoped>
.blog{
  width: 100%;
  .blogItem{
    width: 100%;
    min-height: 225px;
    padding: 20px;
    display: flex;
    margin-bottom: 15px;
    border-radius: 5px;
    background: #fff;
    img{
      width: 180px;
      height: 180px;
      border-radius: 10px;
      margin-right: 30px;
    }
    .right{
      flex: 1;
      h1{
        font-size: 24px;
        font-weight: 540;
        margin-bottom: 30px;
      }
      p{
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      &>div{
        margin-top: 70px;
        display: flex;
        font-size: 14px;
        color: #7a8b9a;
        span{
          margin-right: 30px;
        }
        u{
          margin-right: 30px;
        }
        p{
          margin-left: auto;
          margin-right: 20px;
          font-size: 16px;
          .iconfont{
            margin-right: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>