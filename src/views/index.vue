<template>
  <div class="main">
    <top/>
  </div>
</template>

<script>
let top = () => import("./top/top.vue")
export default {
  components: {
    top
  }
}
</script>

<style lang="scss" scoped>
  .main{
    width: 1920px;
    height: 100%;
    margin: 0 auto;
  }
</style>