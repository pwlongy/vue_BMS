<template>
  <div class="fans">
    <ul>
      <li
        :class="item.isActive ? 'isActive' : ''"
        v-for="(item, index) in flowwerList"
        :key="index"
      >
        <span style="display: flex; align-items: center">
          <el-avatar :size="30" :src=" flowwerUserName[index].avatar"></el-avatar>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ flowwerUserName[index].username }}
        </span>
        <div @click="updataUser(item)">取消关注</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getuserMsg, updatafollowerMan } from "utils/user";
export default {
  data() {
    return {
      id: "",
      flowwerList: [],
      flowwerUserName:[], // 存储用户名称
    };
  },
  methods: {
    // 取消关注
    updataUser(id) {
      // 获取用户信息
      let userid = JSON.parse(sessionStorage.getItem("user"))._id;
      updatafollowerMan(id, userid)
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "取消关注成功",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userMsg(id,index) {
      // console.log('id',id);
      // console.log('index',index);
        getuserMsg(id)
          .then((res) => {
            console.log(res.data);
            this.flowwerUserName.push(res.data)
            if(this.flowwerList.length-1 !== index){
               this.userMsg(this.flowwerList[index+1],index+1)
            }
           
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  async created() {
    this.id = JSON.parse(sessionStorage.getItem("user"))._id;
    await getuserMsg(this.id).then((res) => {
      console.log(res);
      res.data.followers.forEach((item) => {
        // item.isActive = true
        console.log(item);
      });
      this.flowwerList = res.data.followers;
      this.userMsg(this.flowwerList[0],0)
    });
  },
  filters: {},
};
</script>

<style scoped lang="scss">
.fans {
  ul {
    li {
      padding-left: 20px;
      border-bottom: 1px solid #eee;
      height: 60px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div {
        height: 30px;
        border: 1px solid blue;
        padding: 0px 10px;
        border-radius: 5px;
        margin-right: 40px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: #42c02e;
          color: #fff;
          border: none;
        }
      }
      .isActive {
        background: #42c02e;
      }
    }
  }
}
</style>