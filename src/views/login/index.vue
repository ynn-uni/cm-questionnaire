<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form flex" auto-complete="on" label-position="left">

      <div class="title-container">
        <div class="title">欢迎使用可用性量表数据分析平台</div>
      </div>

      <div class="input-group flex align-center">
        <span>+86</span>
        <input v-model="tel" type="text" placeholder="请输入您的手机号">
      </div>

      <div class="input-Group flex justify-between">
        <input v-model="code" type="text" placeholder="请输入您的手机验证码">
        <el-button @click="login">{{ time>0?time+'秒':'发送验证码' }}</el-button>
        <!-- <button></button> -->
      </div>
      <div class="checkbox flex">
        <el-checkbox v-model="check" name="type" />
        <span>我已阅读并同意云坊服务协议和隐私政策</span>
      </div>

      <el-button class="login-btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">下一步</el-button>

    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getSmsCode, checkSmsCode } from '@/api/user'
// import { getSmsCode } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      tel: '18323084462',
      check: false,
      code: null,
      identifier: null,
      time: 0
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    login() {
      getSmsCode({ 'mobile': this.tel }).then((res) => {
        this.cutDown(120)
        this.identifier = res.data.identifier
      })
    },
    handleLogin() {
      // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1ZTVmN2FiYjBjOWRhIiwiaWF0IjoxNTgzMzE1NjQzLCJuYmYiOjE1ODMzMTU2NDMsImV4cCI6MTU4MzMyMjg0MywiaWQiOjEsInR5cGUiOjEsIm1vYmlsZSI6IjE4MzIzMDg0NDYyIiwidHJ1ZW5hbWUiOm51bGx9.e8l_ydoRodvPKWnAX4uov4V9RHQwM2jcQU3jXtm2F64'
      // this.$store.commit('user/updateToken', token)
      // setToken(token)
      // this.$router.push({ path: '/' })
      if (this.tel && this.code && this.identifier) {
        checkSmsCode({ 'mobile': this.tel, 'code': this.code, 'identifier': this.identifier }).then((res) => {
          console.log(res.data.token)
          this.$store.commit('user/updateToken', res.data.token)
          setToken(res.data.token)
          this.$router.push({ path: this.redirect || '/' })
        })
      } else {
        Message({
          message: '请输入电话号和验证码',
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    cutDown(time) {
      this.time = time
      var timer = setInterval(() => {
        if (this.time > 0) {
          this.time = this.time - 1
        } else {
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background:linear-gradient(359deg,rgba(0,83,255,1) 0%,rgba(119,210,253,1) 100%);
  overflow: hidden;
  .input-group{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    color: #8F959E;
    padding: 4px 0;
    margin-bottom: 50px;
    span{
      display: block;
      width: 67px;
      height: 100%;
      line-height: 36px;
      text-align: center;
      border-right: 1px solid #979797;
    }
    input{
      border:none;
      outline: none;
      padding-left: 10px;
      color: #8F959E;
    }
  }
  .input-Group{
    width: 400px;
    margin-bottom: 100px;
     input{
      width: 300px;
      height: 40px;
      line-height: 36px;
      border:none;
      outline: none;
      padding-left: 10px;
      color: #8F959E;
      border-radius: 5px;
    }
    button{
      padding: 0;
      width:92px;
      height:40px;
      line-height: 40px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      border:none;
      background:rgba(255,174,65,1);
      border-radius:8px;
    }
  }
  .checkbox{
    font-size: 14px;
    color: #fff;
    span{
      margin-left: 4px;
    }
  }
  .login-form {
    position: fixed;
    right: 200px;
    bottom: 200px;
    width: 600px;
    flex-direction: column;
    align-items: center;
    .login-btn{
      width: 340px;
      background-color: #FFAE41;
    }
    .el-checkbox{
        font-size: 14px;
        color: #fff;
        margin-bottom: 21px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 30px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
    }
  }

}
</style>
