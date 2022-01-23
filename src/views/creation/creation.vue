<template>
  <div class="create">
    <div class="input">
      <el-input
        placeholder="请输入文章标题"
        v-model="input"
        clearable>
      </el-input>
      <div class="save">
        <button @click="open">草稿箱</button>
        <el-popover
          placement="bottom"
          width="700"
          popper-class="publish"
          trigger="click">
          <div class="content">
            <h1>发布文章</h1>
            <div class="category">
              <span>分类:</span>
              <div class="main" @click="isActive">
                <span class="isActive">前端</span>
                <span>后端</span>
                <span>Android</span>
                <span>IOS</span>
                <span>人工智能</span>
                <span>开发工具</span>
                <span>代码人生</span>
                <span>阅读</span>
              </div>
            </div>
            <div class="addtags">
              <span>添加标签:</span>
              <div class="main">
                  <el-select v-model="tag" placeholder="请选择活动区域">
                    <el-option label="前端" value="shanghai"></el-option>
                    <el-option label="后端" value="beijing"></el-option>
                  </el-select>
              </div>
            </div>
            <div class="cover">
              <span>文章封面:</span>
              <div class="main">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>建议尺寸： 1303*734px</span>
              </div>
            </div>
            <div class="summary">
              <span>编辑摘要:</span>
              <div class="main">
                <el-input
                  type="textarea"
                  autosize
                  :show-word-limit="true"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </div>
            </div>

            <div class="btns">
                <button>取消</button>
                <button @click="pushBlog">确认并发布</button>
            </div>
          </div>
          <span slot="reference">发布</span>
        </el-popover>
      </div>
    </div>
    <div id="main">
      <mavon-editor 
        v-model="value" 
        font-size="20px" 
        :ishljs = "true"/>
    </div> 

  </div>
  
</template>

<script>
import {createBlog} from 'utils/archcle'
export default {
  data () {
    return {
      // 标题
      input: '',
      // 内容
      value: '',
      // 选中标签
      tag: "",
      // 图片地址
      imageUrl: '',
      textarea: ""
    }
  },
  methods: {
    // 保存到草稿箱
      open() {
        console.log(12)
        this.$confirm('此操作将文件保存在草稿箱, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },

    isActive(e) {
      // console.log(e.target)
      // console.log(e.target.nextSibling)
      // console.log(e.target.parentNode.childNodes)
      // console.log(e)
      // 遍历所有子节点
      e.target.parentNode.childNodes.forEach(item => {
        // 将所有 item 清除class
        item.classList.remove('isActive');
      });
      e.target.className += " isActive"
    },

    // 图片上传成功 触发的钩子函数
    handleAvatarSuccess() {
      console.log("图片上传成功")
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	
    beforeAvatarUpload() {

    },
    // 确认提交博客
    pushBlog() {
      console.log(123)
      let obj = {
        title: this.input,
        user_id: "61ea465d787c800565f30cc1",
        content: this.value,
        overview: this.textarea
      }
      createBlog(obj).then(res => {
        console.log(res)
        if(res.code !== 2000){
          this.$message("服务器错误,文章发表失败")
        }else{
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        }

      })
    }

  }
}
</script>

<style lang="scss" scoped>
.create{
  height: 100%;
  display: flex;
  flex-direction: column;
  .input{
    height: 80px;
    display: flex;
    align-items: center;
    ::v-deep .el-input{
      input{
        height: 80px;
        font-size: 30px;
        border: none;
        padding-left: 40px;
      }
    }
    .save{
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      button{
        width: 100px;
        height: 50px;
        font-size: 18px;
        color: #1d7dfa;
        background: none;
        border: 1px solid #1d7dfa;
        
      }
      span{
        display: block;
        width: 100px;
        height: 50px;
        background: #1d7dfa;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  #main{
    flex: 1;
    .markdown-body{
      height: 100%;
    }
  }
}
  
</style>