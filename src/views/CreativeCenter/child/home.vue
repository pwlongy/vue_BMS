<template>
  <div class="home">
    <div class="activity">
      <div class="title">
        <span>创作活动</span>
      </div>

      <div class="block">
        <el-carousel trigger="click" height="300px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>

    <div class="DataSummary">
      <div class="title">
        <span>数据概括</span>
      </div>
      <div class="data">
        <div class="dataItem">
          <span>总关注数</span>
          <h2>0</h2>
          <u>较前日 --</u>
        </div>
        <div class="dataItem">
          <span>总关注数</span>
          <h2>0</h2>
          <u>较前日 --</u>
        </div>
        <div class="dataItem">
          <span>总关注数</span>
          <h2>0</h2>
          <u>较前日 --</u>
        </div>
        <div class="dataItem">
          <span>总关注数</span>
          <h2>0</h2>
          <u>较前日 --</u>
        </div>
        <div class="dataItem">
          <span>总关注数</span>
          <h2>0</h2>
          <u>较前日 --</u>
        </div>
        <div class="dataItem">
          <span>总关注数</span>
          <h2>0</h2>
          <u>较前日 --</u>
        </div>
      </div>
    </div>

    <div class="publish">
      <div class="title">
        <span>近期发布</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  components: {
    
  }  
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    .activity{
      background: #fff;
      height: 450px;
      .title{
        span{
          font-size: 22px;
          display: block;
          padding: 24px;
          border-bottom: 1px solid #e5e6eb;
        }

      }

      .block{
        padding: 25px 20px;
        height: 300px;
      }
    }

    .DataSummary{
      margin-top: 20px;
      background: #fff;
     .title{
        span{
          font-size: 22px;
          display: block;
          padding: 24px;
          border-bottom: 1px solid #e5e6eb;
        }
     }
     .data{
       display: flex;
       justify-content: space-around;
       flex-wrap: wrap;
       .dataItem{
         background: #f7f8fa;
         width: 356px;
         height: 158px;
         border-radius: 6px;
         margin: 25px 0;
         padding: 25px;
         span{
           color: #4e5969;
         }
         h2{
           margin: 10px 0;
           font-weight: 600;
           font-size: 30px;
         }
         u{
           font-size: 14px;
           color: #4e5969;
         }
       }
     }
    }

    .publish{
      background: #fff;
      margin-top: 20px;
       .title{
        span{
          font-size: 22px;
          display: block;
          padding: 24px;
          border-bottom: 1px solid #e5e6eb;
        }
     }
    }
  }


  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>