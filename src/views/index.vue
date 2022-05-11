<template>
  <div class="app">
    <top @changeinput="changeinput"/>
    <router-view/>
  </div>
</template>

<script>
let top = () => import("@/components/common/top/header.vue")
import {findList} from "utils/archcle.js" 
export default {
  components: {
    top
  },
  data() {
    return {
    };
  },
  created(){

  },
  methods: {
    changeinput(input){
      console.log(input)
      findList(input)
        .then(res => {
          console.log(res)
          // 事件车
          this.event.$emit("changeList", res.data)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.app{
  min-height: 100% !important;
  width: 1920px;
  margin: auto;
  position: relative;
}

</style>