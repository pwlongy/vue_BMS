<template>
  <div class="Information">
    <!-- <el-avatar :size="100" :src="squareUrl"></el-avatar> -->
    <img src="../../assets/avatar.jpg"/>
    <h1>何须问</h1>
    <span>故人何处再相逢</span>
    <div class="tag">
      <div>
        <h2>文章</h2>
        <span>600000</span>
      </div>
      <div>
        <h2>标签</h2>
        <span>6</span>
      </div>
    </div>
    <button>加入书签</button>
    <div class="share">
      <i class="iconfont icon-github" @click="share(1)"></i>
      <i class="iconfont icon-zhifubao" @click="share(2)"></i>
      <i class="iconfont icon-weixin-copy" @click="share(3)"></i>
      <i class="iconfont icon-qq" @click="share(4)"></i>
      <i class="iconfont icon-youxiang" @click="share(5)"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      squareUrl: '../../assets/avatar.jpg'
    }
  }
}
</script>

<style scoped lang="scss">
  .Information{
    width: 360px;
    height: 440px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &>img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
       margin-top: 20px;
      margin-bottom: 16px;
    }
    // .el-avatar{
    //   margin-top: 20px;
    //   margin-bottom: 16px;
    // }
    h1{
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 30px;
    }
    &>span{
      display: block;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .tag{
      width: 312px;
      height: 60px;
      display: flex;
      div{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        h2{
          font-size: 20px;
          margin-bottom: 14px;
        }
        span{
          font-weight: 600;
        }
      }
    }

    button{
      width: 312px;
      height: 40px;
      background-color: #333333;
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
    }
    button:hover{
      background: #3eaf7c;
    }

    .share{
      width: 260px;
      display: flex;
      margin-top: 30px;
      .iconfont{
        display: block;
        flex: 1;
        font-size: 30px;
        cursor: pointer;
      }
      .iconfont:hover{
        color: #3eaf7c;
      }
    }

  }
</style>