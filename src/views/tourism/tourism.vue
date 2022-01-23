<template>
  <div class="tourism">
    <!-- 导航 -->
    <div class="left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <span slot="title">总览</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>国内</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>国外</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <div class="amap">
        <!-- 地图 -->
        <!-- <el-amap vid="amapDemo" :zoom="zoom" :center="center"></el-amap> -->

        <!-- 点坐标 -->
        <el-amap vid="amapDemo" :zoom="zoom" :keyboardEnable="true" >
          <el-amap-marker 
            v-for="(marker, index) in markers"  
            :key="index"
            :position="marker.position"
            >
            <img :src="marker.icon.image" style="width: 30px; height: 30px">
          </el-amap-marker>
        </el-amap>
      </div>
    </div>
  </div>
</template>

<script>

// var marker = new AMap.Marker({
//     position: new AMap.LngLat(116.39,39.9),
//     offset: new AMap.Pixel(-10, -10),
//     icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
//     title: '北京'
// });
// console.log(this.AMap)
// import { AMapManager } from "vue-amap";
// let amapManager = new AMapManager();

import icon from '../../assets/icon.png'
// new AMap.Icon({
//       image: location,
//       size: new AMap.Size(2, 2),
//       imageSize: new AMap.Size(2, 2)
// });
export default {
  
  data() {
    return {
      // 地图缩放级别范围
      zoom: [3,18],
      // 地图中心点坐标
      center: [],
      // 点标记位置
      markers: [
        {
          position: [116.473179, 39.993169],
          icon: {
            image: icon
          },
        }
      ],
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {
      
    }
  }

}
</script>

<style scoped lang="scss">
  .tourism{
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
      height: 100%;
      .amap{
        height: 100%;
        .el-vue-amap{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>