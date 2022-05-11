<template>
  <div class="fans">
    <ul>
      <li
        :class="item.isActive ? 'isActive' : ''"
        v-for="(item, index) in fansList"
        :key="index"
      >
        <span style="display: flex; align-items: center">
          <el-avatar :size="30" :src=" fansUserName[index].avatar"></el-avatar>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ fansUserName[index].username }}
        </span>
        <div @click="updataUser(item)">关注</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getuserMsg, followerMan } from "utils/user";
export default {
  data() {
    return {
      id: "",
      fansList: [],
      fansUserName:[], // 存储用户名称
    };
  },
  methods: {
    // 取消关注
    updataUser(id) {
      // 获取用户信息
      let userid = JSON.parse(sessionStorage.getItem("user"))._id;
      followerMan(id, userid)
        .then((res) => {
          console.log(res);
          this.$message({
            type: "success",
            message: "关注成功",
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
            this.fansUserName.push(res.data)
            if(this.fansList.length-1 !== index){
               this.userMsg(this.fansList[index+1],index+1)
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
      res.data.fans.forEach((item) => {
        // item.isActive = true
        console.log(item);
      });
      this.fansList = res.data.fans;
      this.userMsg(this.fansList[0],0)
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