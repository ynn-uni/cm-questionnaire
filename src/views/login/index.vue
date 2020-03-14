<template>
  <div class="login-container flex">

    <img src="@/assets/images/logo.png" alt="" class="logo">

    <el-row :gutter="20">
      <el-col v-bind="column" class=" flex justify-center">
        <div class="loginimg">
          <img src="@/assets/images/login.png" alt="">
        </div>
      </el-col>
      <el-col v-bind="column" class="flex justify-center">
        <el-form ref="loginForm" class="login-form flex" auto-complete="on" label-position="left">

          <div class="title-container">
            <div class="title">欢迎使用可用性量表数据分析平台</div>
          </div>

          <div class="input-group flex align-center">
            <span>+86</span>
            <input v-model="tel" type="text" placeholder="请输入您的手机号">
          </div>

          <div class="input-Group flex justify-between">
            <input ref="smsCodeInput" v-model="code" type="text" placeholder="请输入您的手机验证码">
            <el-button @click="fetchSmsCode">{{ time>0?time+'秒':'发送验证码' }}</el-button>
          </div>
          <div class="checkbox flex">
            <el-checkbox v-model="check" name="type" />
            <span>我已阅读并同意云坊服务协议和隐私政策</span>
          </div>

          <el-button class="login-btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">下一步</el-button>

        </el-form>
      </el-col>
    </el-row>

    <!-- <img src="@/assets/images/login.png" alt=""> -->
  </div>
</template>

<script>
import { getSmsCode, checkSmsCode } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      tel: '',
      check: true,
      code: null,
      identifier: null,
      time: 0,
      column: {
        xs: 24,
        sm: 12
        // md: 12
        // xl: 8
      }
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
    fetchSmsCode() {
      if (this.time > 0) return
      getSmsCode({ 'mobile': this.tel }).then((res) => {
        this.cutDown(120)
        this.identifier = res.identifier
        this.$message.success('短信验证码发送成功！')
        this.$refs.smsCodeInput.focus()
      })
    },
    handleLogin() {
      if (!this.check) return

      if (!this.tel) {
        this.$message.error('请输入手机号')
      } else if (!this.code) {
        this.$message.error('请输入验证码')
      } else if (!this.identifier) {
        this.$message.error('请重新获取手机验证码')
      } else {
        checkSmsCode({ 'mobile': this.tel, 'code': this.code, 'identifier': this.identifier }).then((res) => {
          const token = 'Bearer ' + res.token
          this.$store.commit('user/updateToken', token)
          setToken(token)
          this.$router.push({ path: this.redirect || '/' })
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
  padding-top: 60px;
  padding-left: 114px;
  flex-direction: column;
  // justify-content: space-around;
  .logo{
    width: 325px;
    height: 105px;
    margin-bottom: 150px;
  }
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
      width: 300px;
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
    // position: fixed;
    // right: 200px;
    // bottom: 200px;
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
  .loginimg{
    margin-bottom: 30px;
    // margin-top: 100px;
    // margin-left: 80px;
    //  @media #{$md} {
    //   width: 50%;
    // }
  }
}
</style>
