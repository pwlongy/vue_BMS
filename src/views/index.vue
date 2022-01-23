<template>
  <div class="app">
    <top/>
    <router-view/>
  </div>
</template>

<script>
let top = () => import("@/components/common/top/header.vue")

export default {
  components: {
    top
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.app{
  width: 1920px;
  margin: auto;
  position: relative;
}

</style>