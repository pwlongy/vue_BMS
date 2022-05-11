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
              <div class="mianAdd">
                <div class="main categorytag" @click="isActive">
                  <span  
                    v-for="(item, index) in categoryList" 
                    :key="index" 
                    :data-value="item._id" 
                    v-text="item.name"></span>
                  <!-- <span class="isActive">前端</span>
                  <span>后端</span>
                  <span>Android</span>
                  <span>IOS</span>
                  <span>人工智能</span>
                  <span>开发工具</span>
                  <span>代码人生</span>
                  <span>阅读</span> -->
                  <span ref="add" class="el-icon-circle-plus-outline" @click="addInput" v-if="isadd"></span>
                  <el-input 
                    v-model="categoryInput" 
                    :autofocus="true"
                    v-else
                    @blur="blurAdd"></el-input>
                </div>
               
              </div>
              
            </div>
            <div class="addtags">
              <span>添加标签:</span>
              <div class="main">
                  <el-select v-model="tag" placeholder="请选择活动区域">
                    <el-option
                      v-for="(item, index) in tagList"
                      :key="index"
                      :label="item.name" 
                      :value="item._id"></el-option>
                  </el-select>
              </div>
            </div>
            <div class="cover">
              <span>文章封面:</span>
              <div class="main">
                <el-upload
                  class="avatar-uploader"
                  action= ""
                  :http-request = "pull"
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
        ref="md"
        v-model="value"
        @imgAdd="imgAdd"
        font-size="20px" 
        :ishljs = "true"/>
    </div> 

  </div>
  
</template>

<script>
import {createBlog, pullImg, getBlogForId, updataBlog} from 'utils/archcle'
import {getCategory, getTag, addCategory} from "utils/category"
import {mapState} from "vuex"
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
      // 文章概述
      textarea: "",
      // 分类列表
      categoryList: [],
      // tag标签
      tagList: [],
      // 是否显示 添加span
      isadd: true,
      // 输入分类名称
      categoryInput: "",
      // 分类id
      classId: "",
      // 获取用户信息
      userMsg: {},
      // 文章id
      BlogId: ''
    }
  },
  computed: {
    ...mapState("user", ['user'])
  },
  created () {
    // 获取文章id所有信息
    this.BlogId = this.$route.query.id
    // 通过id获取所有信息
    getBlogForId(this.BlogId)
      .then(res => {
        let data = res.data
        console.log(data)
        this.input = data.title
        this.value = data.content
        this.textarea = data.overview
        this.tag = data.tags
        this.classId = data.classId
      })
      .catch(err => {
        console.log(err)
      })


    // 获取分类列表
    getCategory().then(res => {
      console.log(res)
      if(res.code == 2000){
        this.categoryList = res.data
      }else if(res.code == 4001){
        this.$message({
          type: 'error',
          message: "用户未登录，请先登录"
        })
      }
    })

    // 获取tag标签
    getTag().then(res => {
        if(res.code == 2000){
        this.tagList = res.data
      }else if(res.code == 4001){
        this.$message({
          type: 'error',
          message: "用户未登录，请先登录"
        })
      }
    })

    // 获取用户信息
    this.userMsg = JSON.parse(sessionStorage.getItem("user")) || ""
    
  },
  methods: {
    // 将数据 用户id保存
    
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
      console.log(e.target.getAttribute("data-value"))
      if(e.target.getAttribute("data-value")){
        this.classId = e.target.getAttribute("data-value")
      }
      e.target.parentNode.childNodes.forEach(item => {
        // 将所有 item 清除class
        item.classList.remove('isActive');
      });
      e.target.className += " isActive"
    },

    // 图片上传成功 触发的钩子函数
    handleAvatarSuccess(response, file, fileList) {
      console.log(123)
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	
    beforeAvatarUpload() {

    },
    pull(data) {
      console.log(data)
      pullImg(data.file).then(res => {
        if(res.code == 2000){
          this.imageUrl = "/images/"+res.data
        }else if( res.code === 4001){
          this.$message({
            type: "error",
            message: "用户未登录,请登录后执行操作"
          })
        }
      })
    },
    // 确认提交博客
    pushBlog() {
      console.log(this.user)
      let obj = {
        title: this.input,
        userId: this.userMsg._id,
        content: this.value,
        overview: this.textarea,
        classId: this.classId,
        tags: this.tag
      }
      console.log(obj)

      // 判断所有的obj都有值
      let flag = true
      for(let item in obj){
        if(!obj[item]){
          // 有值为空
          this.$message({
            type: "error",
            message: "请将所有内容填写完毕"
          })
          flag =false
          return
        }
      }
      obj.titleImg = this.imageUrl
      if(flag){
        // 判断是否为修改数据页面
        if(this.BlogId){
          obj.id = this.BlogId
          // console.log(12345679)
          updataBlog(obj)
            .then(res => {
              if(res.code == 200){
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                // 返回上一页
                this.$router.go(-1)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }else{
          createBlog(obj).then(res => {
            console.log(res)
            if(res.code !== 2000){
              this.$message("服务器错误,文章发表失败")
            }else{
              this.$router.push("/success")
            }
          })
        }
        
      }
      

    
    },
    // 添加分类
    addInput(){
      this.isadd = false
      this.isFocus = true
    },
    blurAdd() {
      // 失去焦点时添加分类标签
      if(this.categoryInput.trim()){
        addCategory(this.categoryInput)
          .then((res) => {
            console.log(res)
            this.categoryList.push(res.data)
            this.categoryInput = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
      this.isadd = true
    },
    // 添加图片
      imgAdd(pos, file){
       // 第一步.将图片上传到服务器.
      // var formdata = new FormData();
      // formdata.append('image', $file);
      // console.log($file)
      console.log(file)
      pullImg(file).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          // console.log(url)
          console.log(this.$refs)
          this.$refs.md.$img2Url(pos, 'http://localhost:3000/images/' + url.data);
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
      height: calc(100vh - 80px);
    }
  }
}
  
</style>