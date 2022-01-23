<template>
  <div class="life">
    <div class="left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <span slot="title">年度计划</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>日记</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>游戏</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-menu-item index="4">
          <span slot="title">动漫</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
  .life{
    display: flex;
    height: calc(100vh - 72px);
    .left{
      width: 400px;
      height: 100%;
      .el-menu{
        border-right: none;
        .el-menu-item, .el-submenu{
          span{
            font-size: 22px;
            font-weight: 600;
          }
          .el-menu-item-group{
            .el-menu-item{
              font-size: 20px;
            }
          }
        }
      }
    }
    
    .right{
      flex: 1;
      background: orange;
    }
  }
</style>