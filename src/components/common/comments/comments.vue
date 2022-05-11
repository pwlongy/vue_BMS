<template>
  <div class="comments">
    <div class="conmmentsInput clear_fix">
      <div class="input">
        <el-avatar :size="50" :src="userMsg.avatar"></el-avatar>
        <el-input type="textarea" v-model="comment"></el-input>
      </div>
      <el-button type="primary" @click="pushComment">发表评论</el-button>
    </div>
    <div class="commentsItem" v-for="(item, index) in commentsList" :key="index">
      <el-avatar :size="40" :src="item.avatar || item.user_id.avatar"></el-avatar>
      <div class="CommentsMsg">
        <h2 v-text="item.username || item.user_id.username"></h2>
        <p v-text="item.content"></p>
        <div class="support">
          <!-- 点赞 -->
          <span><i class="iconfont icon-dianzan"></i>0</span>
          <!-- 评论 -->
          <span><i class="iconfont icon-xiaoxi" ></i>0</span>
          <div class="del"
            v-if="item.id == userMsg._id || item.user_id._id == userMsg._id" 
            @click="deletComment(item.id || item._id, userMsg._id, index)">
            删除
          </div>
          <div class="childComment" v-show="false">
            <el-input type="textarea" v-model="desc"></el-input>
            <el-button type="primary" @click="pushComment">发表评论</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="childMsg">
        <el-avatar :size="40" :src="squareUrl"></el-avatar>
        <div class="CommentsMsg">
          <h2>名称名称名称名称名称名称名称名称名称</h2>
          <p>内容内容内容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容</p>
          <div class="support">
            <span><i class="iconfont icon-dianzan"></i>点赞</span>
            <span><i class="iconfont icon-xiaoxi"></i>回复</span>
            <div class="del" >删除</div>
          </div>
        </div>
      </div> -->
    </div>
    
  </div>  
</template>

<script>
import {pullcomment, delComment} from "../../../utils/comments"
export default {
   data() {
      return {
        squareUrl: '',
        circleUrl: "",
        // 评论内容
        comment: '',
        userMsg: {
          _id: '',
          avatar: ''
        },
        // 子评论内容
        desc: ""
      }
    },
    props: {
      commentsList: []
    },
    created () {
      if(sessionStorage.getItem("user")){
        this.userMsg = JSON.parse(sessionStorage.getItem("user"))
        console.log(this.userMsg)
      }
    },
    methods: {
      // 发表评论
      pushComment() {
        let commentObj = {}
        commentObj.content = this.comment,
        commentObj._id = this.userMsg._id,
        commentObj.article_id = this.$route.params.id
        console.log(commentObj)
        // console.log(this.$route.params.id)
        pullcomment(commentObj).then(res => {
          console.log(res)
          if(res.code == 2000){
            this.comment = ""
             this.$message({
              type: 'success',
              message: '发布成功'
            });
            let newcommentObj = JSON.parse(JSON.stringify(commentObj).replace(/_id/,"id"))
            newcommentObj.avatar = this.userMsg.avatar
            newcommentObj.username = this.userMsg.username
            console.log(newcommentObj)
            // 将数据添加到评论区
            this.commentsList.unshift(newcommentObj)
          }else if(res.code == 4001){
            this.$message({
              type: 'error',
              message: "用户未登录，请登录后执行操做"
            })
          }
        })
        .catch(() => {
          this.$message({
              type: 'error',
              message: "用户未登录，请登录后执行操做"
            })
        })
      },
      // 删除评论
      deletComment(id, userid, index){
        console.log(id, userid)
        console.log(id+'1', userid+"2")
        delComment(id, userid)
          .then(res => {
            console.log(res)
            // 执行数组移除的操作
            if(res.code == 2000){
              this.commentsList.splice(index, 1);
              this.$message({
                type: "success",
                message: "评论删除成功"
              })
            }
            
          })
          .catch(err => {
            console.log(err)
          })
      }
     
    },
}
</script>

<style lang="scss" scoped>
.comments{
  padding-top: 20px;
  .conmmentsInput{
    margin-bottom: 40px;
    .input{
    display: flex;
      .el-avatar{
        margin-right: 10px;
      }
      ::v-deep .el-textarea{
        font-size: 22px;
        textarea{ 
          height: 100px;
          resize: none
        }
      }
    }
    .el-button{
      float: right;
      margin-top: 10px;
    }
  }
 
  .commentsItem{
    display: flex;
    flex-wrap: wrap;
    min-height: 130px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-top: 20px;
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
        // 追加评论
        .childComment{
          // margin-top: 5px;
          ::v-deep .el-textarea{
            margin-top: 15px;
            textarea{
              height: 60px;
              resize: none
            }
          }
          .el-button{
              margin-top: 10px;
              float: right;
            }
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