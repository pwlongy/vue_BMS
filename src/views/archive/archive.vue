<template>
  <div class="archive">
    <div class="left">
      <img src="~/assets/bg/323909.jpg"/>
    </div>
    <div class="right">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
   
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
  
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
     
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>

          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-timeline-item>
        </el-timeline>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 15, 20, 30]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="30">
            </el-pagination>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped lang="scss">
  .archive{
    height: calc(100vh - 72px);
    width: 1920px;
    display: flex;
    .left{
      width: 700px;
      height: 100%;
      background: coral;
      overflow: hidden;
      position: relative;
      img{
        height: 100%;
        position: absolute;
        left: -100px;
      }
    }
    .right{
      flex: 1;
      
    }
  }
</style>