<template>
    <div class="blog">
      <div class="blogItem" @click="jumpDetail" v-for="(item, index) in blogList" :key="index">
        <img/>
        <div class="right">
          <h1 v-text="item.title"></h1>
          <p v-text="item.overview"></p>
          <div>
            <span>{{item.create_time}}</span>
            <u>笔记</u>
            <label>顶置</label>
            <p><i class="iconfont icon-xiaoxi"></i>99</p>
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
    jumpDetail() {
      this.$router.push("/detail")
    }
  }
}
</script>

<style lang="scss" scoped>
.blog{
  width: 100%;
  height: 400px;
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