<template>
  <div class="detail">
    <Top/>
    <main>
      <div class="left">
        <el-badge :value="12">
          <i class="iconfont icon-dianzan"></i>
        </el-badge>
        <el-badge :value="3">
          <i class="iconfont icon-xiaoxi-xiaoxi"></i>
        </el-badge>
        <el-badge :value="1" type="info">
          <i class="iconfont icon-shoucang1"></i>
        </el-badge>
        <el-badge :value="2" type="warning">
          <i class="iconfont icon-weixianyuan"></i>
        </el-badge>
      </div>

      <div class="right">
        <div class="pagemsg">
          <div class="title">
            <div class="userMsg">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
              <div>
                <p>名字</p>
                <span>时间<u>阅读<i>999999</i></u></span>
              </div>
            </div>
            <div class="concernBtn">
              <el-button type="success" plain>关注</el-button>
            </div>
          </div>
          <img src="#"/>
        </div>
        <!-- 分类 标签 -->
        <p>
          <span>文章分类</span>
            <el-tag
            type = "success"
            effect = "plain">
              前端
            </el-tag>
          <span>文章标签</span>
          <el-tag
            type = "success"
            effect = "plain">
              前端
            </el-tag>
        </p>
        <!-- 评论 -->
        <Comments></Comments>
      </div>
      <div class="msg">
        <span>关于作者</span>
        <div class="userMessage">
          <el-avatar :size="64" :src="circleUrl"></el-avatar>
          <div>
            <span>asbdbsaudua</span>
            <i>asjdhuishau</i>
          </div>
        </div>
        <div>
          <p>获得点赞<i>999999</i></p>
          <u>文章被阅读<i>9999999</i></u>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
let Top = () => import("@/components/common/top/header.vue")
let Comments =  () => import("@/components/common/comments/comments.vue")

export default {
  data () {
    return {
      circleUrl: ''  
    }
  },
  components: {
    Top,
    Comments
  }
}
</script>

<style lang="scss" scoped>
  .detail{
    background: #f4f5f5;
    min-height: 100%;
    main{
      width: 1500px;
      margin: auto;
      display: flex;
      min-height: 100%;
      .left{
        margin-top: 165px;
        width: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-badge{
          margin: 6px;
          i{
            display: block;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 1px solid #f4f5f5;
            padding: 0;
            text-align: center;
            background: #fff;
            line-height: 45px;
            cursor: pointer;
            color: #b2bac2;
            font-size: 18px;
          }
        }
      }
      .right{
        margin-top: 28px;
        width: 880px;
        min-height: 100%;
        background: #fff;
        padding: 30px;
        .pagemsg{
          border-bottom: 1px solid #e5e6eb;
          padding-bottom: 80px;
          .title{
            display: flex;
            position: relative;
            .userMsg{
              display: flex;
              .el-avatar{
                margin-right: 16px;
              }
              &>div{
                p{
                  font-size: 16px;
                  font-weight: 600;
                  margin-bottom: 12px;
                }
                span{
                  font-size: 14px;
                  color: #909090;
                  u{
                    margin-left: 14px;
                  }
                }
              }
            }
            .concernBtn{
              position: absolute;
              right: 0;
              font-size: 16px;
              color: #6cbd45;
            }  
          }

          &>img{
            margin-top: 30px;
            width: 100%;
            height: 300px;
            border: 1px solid #6cbd45;
          }
        }
        &>p{
          margin: 40px 0;
          font-size: 18px;

          .el-tag{
            margin-left: 15px;
            margin-right: 30px;
          }
        }
       
      }
      .msg{
        margin-left: 25px;
        width: 300px;
        height: 250px;
        margin-top: 28px;
        background: #fff;
        border: 1px solid #f0f1f1;
        border-radius: 4px;
        &>span{
          display: block;
          font-size: 16px;
          height: 52px;
          border-bottom: 1px solid #f4f4f4;
          line-height: 52px;
          padding-left: 20px;
        }
        .userMessage{
          padding: 20px;
          display: flex;
          &>div{
            display: flex;
            flex-direction: column;
            margin-left: 16px;
            span{
              display: block;
              margin-bottom: 16px;
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
        &>div{
          padding-left: 20px;
          font-size: 14px;
          font-weight: 600;
          p{
            margin: 20px 0;
          }
        }
      }
    }
  }
</style>>