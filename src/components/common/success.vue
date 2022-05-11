<template>
  <div class="success">
    <top/>
    <div class="main">
      <img src="~/assets/success.png"/>
      <span>发布成功!有了你的分享，会变得更好</span>
    </div>
  </div>
</template>

<script>
import top from "@/components/common/top/header.vue"
export default {
  data () {
    return {
      
    }
  },
  components: {
    top
  }
}
</script>

<style scoped lang="scss">
.success{
  width: 100vw;
  height: 100vh;
  background: #f4f5f5;
  .main{
    width: 900px;
    height: 300px;
    margin: 0 auto;
    transform: translateY(40%);
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      height: 400px;
    }
    span{
      display: block;
      text-align: center;
      font-size: 20px;
      color: #666;
      margin-top: 40px;
    }
  }
}
</style>