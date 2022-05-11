<template>
  <div class="detail">
    <Top/>
    <main>
      <div class="left">
        <el-badge>
          <i class="iconfont icon-dianzan" @click="pollNum" :class="poll ? 'isActive': ''"></i>
        </el-badge>
        <el-badge>
          <i class="iconfont icon-xiaoxi-xiaoxi"></i>
        </el-badge>
        <el-badge type="info">
          <i class="iconfont icon-shoucang1"></i>
        </el-badge>
        <el-badge type="warning">
          <i class="iconfont icon-weixianyuan"></i>
        </el-badge>
      </div>
    
      <div class="right" v-if="Object.keys(content).length">
        <div class="pagemsg">
          <div class="title">
            <div class="userMsg">
              <el-avatar :size="50" :src="content.user_id.avatar"></el-avatar>
              <div>
                <p v-text="content.user_id.username"></p>
                <span>时间<u>{{ content.create_time }}</u></span>
              </div>
            </div>
            <div class="concernBtn">
              <el-button plain @click="changeFans" :class="flowwer ? 'isActive' : ''">关注</el-button>
            </div>
          </div>
          <img :src="content.title_img" v-if="content.title_img"/>
        </div>
        <!-- 详细内容 -->
        <mavon-editor 
        v-model="content.content" 
        @change="changeData"
        :toolbarsFlag= "false"
        :editable= "false"
        defaultOpen= "preview"
        :subfield= "false"
        previewBackground="#fff"
        boxShadowStyle="none"
        ref="md"/>
        <!-- 分类 标签 -->
        <p>
          <span>文章分类</span>
            <el-tag
            type = "success"
            effect = "plain"
            v-text="content.class_id.name">
            </el-tag>
          <span>文章标签</span>
          <el-tag
            type = "success"
            effect = "plain"
            v-text="content.tags.name">
            </el-tag>
        </p>
        <!-- 评论 -->
        <Comments :commentsList="commentsList"></Comments>
      </div>

      <div class="msg" v-if="Object.keys(content).length">
        <span>关于作者</span>
        <div class="userMessage">
          <el-avatar :size="64" :src="content.user_id.avatar"></el-avatar>
          <div>
            <span v-text="content.user_id.username"></span>
            <i>{{content.user_id.content || '故人何处再相逢'}}</i>
          </div>
        </div>
        <div>
          <p>获得点赞 &nbsp;&nbsp;&nbsp;&nbsp;<i>{{content.poll_count.length}}</i></p>
          <u>文章被阅读&nbsp;&nbsp;&nbsp;&nbsp;<i>{{content.read_count}}</i></u>
        </div>
      </div>

      
    </main>
  </div>
</template>

<script>
let Top = () => import("@/components/common/top/header.vue")
let Comments =  () => import("@/components/common/comments/comments.vue")
import {getComments} from "../../utils/comments"
import {followerMan, updatafollowerMan} from "utils/user.js"
import {getBlogForId, pollCount, updataCount} from "../../utils/archcle"
export default {
  data () {
    return {
      circleUrl: '' ,
      // 评论列表数据
      commentsList: [],
      // 文章id信息
      id: '',
      // 发布者id
      userId: '',
      // 点赞
      poll: false,
      // 判断点赞是否发生变化
      pollChange: false,

      // 关注
      flowwer: false,
      flowwerChange: false,

      content: {
        // user_id: {
        //   username: ""
        // },
        // class_id: {
        //   name: ''
        // },
        // tags: {
        //   name
        // }
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    // 获取详情详情信息
    getBlogForId(this.id)
      .then(res => {
        console.log(res.data)
        this.content = res.data
        this.userId = res.data.user_id._id
        res.data.poll_count.forEach(item => {
          console.log(item, JSON.parse(sessionStorage.getItem('user'))._id)
          if(item == JSON.parse(sessionStorage.getItem('user'))._id){
            this.poll = true
            this.pollChange = true
          }
        });

        // 判断用户是否关注过此用户
        res.data.user_id.fans.forEach(item => {
          if(item == JSON.parse(sessionStorage.getItem('user'))._id){
            this.flowwer = true
            this.flowwerChange = true
          }
        })
      })
    // 获取评论信息
    getComments(this.id)
      .then(res => {
        console.log(res)
        this.commentsList = res.data
      })
  },
  async destroyed(){
    
    let userId = JSON.parse(sessionStorage.getItem("user"))._id
    let ispoll = false
    let isFlowwer = false
    // 销毁之前进行点赞处理
    if(this.poll){
      await pollCount(this.id, userId)
        .then(res => {
          console.log(res)
          ispoll = true
        })
        .catch(err => {
          console.log(err)
        })
    }
    // 取消点赞
    if(!(this.poll == this.pollChange)){
      if(ispoll) return 
      updataCount(this.id, userId)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    // 关注
    if(this.flowwer){
      await followerMan(this.userId, userId)
        .then(res => {
          isFlowwer = true
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

      // 取消关注
      if(!(this.flowwer == this.flowwerChange)){
        if(isFlowwer) return
        updatafollowerMan(this.userId, userId)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
 
  },
  components: {
    Top,
    Comments
  },
  methods: {
    changeData() {

    },
    // 点赞处理
    pollNum() {
      this.poll = !this.poll
      if(this.poll){
        this.$message({
          type: 'success',
          message: '点赞成功'

        })
      }else{
        this.$message({
          type: 'err',
          message: '取消成功'
        })
      }
    },

    // 关注处理
    changeFans(){
      console.log(this.userId)
      this.flowwer = !this.flowwer
      if(this.flowwer){
        this.$message({
          type: 'success',
          message: '关注成功'
        })
      }else{
        this.$message({
          type: 'err',
          message: '取消关注'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.isActive{
  background:#6cbd45 !important;
  color: #fff !important;
}
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
            height: 400px;
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