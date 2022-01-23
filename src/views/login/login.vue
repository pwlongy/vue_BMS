<template>
  <div id="login">
    <vueCanvasNest></vueCanvasNest>
    <div id="app" class="container">
      <img src="~/assets/bg.jpg" />
      <div class="panel">
        <div class="content login">
          <div class="switch">
            <span :class="{ active: active === 'login' }" @click="go('login')"
              >登陆</span
            >
            <span>/</span>
            <span
              :class="{ active: active === 'register' }"
              @click="go('register')"
              >注册</span
            >
          </div>
          <div class="form" id="fromLogin">
            <template v-if="active === 'register'">
              <div class="input">
                <input
                  :class="{ hasValue: registerForm.Username }"
                  v-model="registerForm.username"
                  type="text"
                  name="Username"
                  id="username"
                /><label for="username">用户名</label>
              </div>
              <div class="input">
                <input
                  :class="{ hasValue: registerForm.Password }"
                  v-model="registerForm.password"
                  type="password"
                  name="Password"
                  id="Password"
                /><label for="Password">密码</label>
              </div>
            </template>

            <template v-if="active === 'login'">
              <div class="input">
                <input
                  :class="{ hasValue: loginForm.username }"
                  v-model="loginForm.username"
                  type="text"
                  name="Username"
                  id="username"
                /><label for="username">用户名</label>
              </div>
              <div class="input">
                <input
                  :class="{ hasValue: loginForm.password }"
                  v-model="loginForm.password"
                  type="password"
                  name="Password"
                  id="Password"
                /><label for="Password">密码</label>
              </div>
            </template>

            <span>忘记?</span>

            <button type="submit" @click="submit">登陆</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import vueCanvasNest from "vue-canvas-nest";
import {login, regist} from "utils/user.js"
export default {
  data() {
    return {
        //配置属性
        config: {
            color: "255, 255, 255",
            opacity: 1,
            zIndex: -1,
            count: 300,
      },//配置炫酷效果

      // 登录数据
      active: 'login',
      registerForm: { username: '', password: '' },
      loginForm: { username: '', password: '', },
   }
  },
 components: {
    vueCanvasNest
  },
 methods: {
    go (type) {
      this.active = type
    },
    submit() {
      if ( this.active === 'login') {
        // 实现登录功能
        login(this.loginForm).then(res => {
          switch (res.code){
            case 2000:
              this.$router.push("/home")
              break;
            case 2001:
              this.$message("用户名或密码正确")
              break;
          }
        })
      } 
      if ( this.active === 'register') {
        // 注册功能
        regist(this.registerForm).then(res => {
          console.log(res)
          switch(res.code){
            case 2000:
              this.$message("注册成功");
              break;
            case 3000:
              this.$message("用户名已存在")
              break
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  * {
    margin: 0;
    padding: 0;
}

body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: miaowu;
    background: linear-gradient(45deg, rgb(181, 154, 254), rgb(245, 189, 253)) fixed;
}

.container {
    position: relative;
    width: 70rem;
    margin: auto;
    transform: translateY(50%);
    margin-top: -337px;
}

.container img {
    width: 70rem;
}

.switch span {
    color: #ccc;
    font-size: 1.4rem;
    cursor: pointer;
}

.switch span.active {
    color: rgb(181, 154, 254);
}

.panel {
    width: 30%;
    margin: 10rem 0 0;
    position: absolute;
    right: 0;
    top: 0;

    display: flex;
    justify-content: center;
}

.form {
    width: 12rem;
    margin: 3rem 0 0;
}

.form .input {
    position: relative;
    opacity: 1;
    height: 2rem;
    width: 100%;
    margin: 2rem 0;
    transition: .4s;
}

.input input {
    outline: none;
    width: 100%;
    border: none;
    border-bottom: .1rem solid rgb(181, 154, 254);
    position: relative;
    line-height: 35px;
    background: transparent;
    z-index: 1;
}

.input label {
    position: absolute;
    left: 0;
    top: 20%;
    font-size: 1.2rem;
    color: rgb(129, 101, 207);
    transition: .3s;
}   

/* fixbug for IMBIT（1448214956） */
.hasValue ~ label, input:focus ~ label {
    top: -50%;
    font-size: .9rem;
}



.form span {
    display: block;
    color: rgb(110, 89, 167);
    font-size: .8rem;
    cursor: pointer;
}

.form button {
    border: none;
    outline: none;
    margin: 2.5rem 0 0;
    width: 100%;
    height: 3rem;
    border-radius: 3rem;
    background: linear-gradient(90deg, rgb(181, 154, 254), rgb(245, 189, 253));
    box-shadow: 0 0 8px rgb(181, 154, 254);
    cursor: pointer;
    color: white;
    font-family: miaowu;
}

#live2dcanvas {
    border: 0 !important;
}
}
</style>