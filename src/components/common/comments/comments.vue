<template>
  <div class="comments">
    <div class="commentsItem">
      <el-avatar :size="40" :src="squareUrl"></el-avatar>
      <div class="CommentsMsg">
        <h2>名称名称名称名称名称名称名称名称名称</h2>
        <p>内容内容内容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容</p>
        <div class="support">
          <span><i class="iconfont icon-dianzan"></i>1</span>
          <span><i class="iconfont icon-xiaoxi"></i>2</span>
          <div class="del">删除</div>
        </div>
      </div>
      <div class="childMsg">
        <el-avatar :size="40" :src="squareUrl"></el-avatar>
        <div class="CommentsMsg">
          <h2>名称名称名称名称名称名称名称名称名称</h2>
          <p>内容内容内容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          <div class="support">
            <span><i class="iconfont icon-dianzan"></i>点赞</span>
            <span><i class="iconfont icon-xiaoxi"></i>回复</span>
            <div class="del">删除</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>  
</template>

<script>
export default {
   data() {
      return {
        squareUrl: ''
      }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
.comments{
  padding-top: 20px;
  .commentsItem{
    display: flex;
    flex-wrap: wrap;
    min-height: 130px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    // 评论
    .CommentsMsg{
      padding-left: 20px;
      width: calc(100% - 70px);
      h2{
        font-size: 16px;
        font-weight: 500;
        width: 150px;
        white-space: nowrap;
        /*溢出部分文字隐藏*/
        overflow: hidden;
        /*溢出部分省略号处理*/
        text-overflow: ellipsis;
      }
      p{
        margin: 20px 0;
        color: #4e5969;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
      .support{
        position: relative;
        width: 100%;
        span{
          display: inline-block;
          color: #86909c;
          margin-right: 22px;
          cursor: pointer;
          .iconfont{
            color: #86909c;
            margin-right: 7px;
          }
        }
        span:hover{
          color: #1e80ff;
          .iconfont{
            color: #1e80ff;
          }
        }
        .del{
          display: none;
          position: absolute;
          right: 20px;
          color: rgb(182, 95, 95);
          cursor: pointer;
        }
      }
    }
    // 回复
    .childMsg{
      padding-top: 15px;
      padding-left: 15px;
      width: 750px;
      background: #f7f8fa;
      margin-left: 60px;
      margin-top: 20px;
      display: flex;
      border-bottom: 1px solid #e5e6eb;
      padding-bottom: 20px;
      .CommentsMsg{
        width: calc(100% - 60px);
        min-height: 125px;
      }
    }
  }

  .commentsItem{
    .CommentsMsg:hover{
      .support{
        .del{
          display: inline-block !important;
        }
      }
    }
    
  }

}
</style>