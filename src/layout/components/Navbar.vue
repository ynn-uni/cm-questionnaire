<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="getHashAvatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="handleEditUser">
            <span style="display:block;">个人资料</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        title="个人资料"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div class="userinfo flex justify-center align-center">
          <img :src="getHashAvatar" class="user-avatar">
          <div class="info">
            <div class="name">账户角色：{{ userInfo.type==1?'学生':'老师' }}</div>
            <div class="name">手机号：{{ userInfo.mobile }}</div>
            <div class="name flex justify-center align-center">
              真实姓名：<span v-if="!isEdit" class="truename">{{ userInfo.truename }}</span>
              <input v-if="isEdit" v-model="userInfo.truename" type="text">
              <i class="el-icon-edit edit" @click="changeEdit" />
              <span class="ed">({{ isEdit?'取消编辑':'点击编辑' }})</span>
            </div>

          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="isEdit" type="primary" @click="saveTruename">保存</el-button>
          <el-button v-else type="primary" disabled="">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Identicon from 'identicon.js'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogVisible: false,
      isEdit: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'userInfo']),
    getHashAvatar() {
      if (this.userInfo) {
        const { mobile } = this.userInfo
        return 'data:image/png;base64,' + new Identicon('user' + mobile, 420)
      }
      return 'http://dummyimage.com/80x80'
    }
  },
  methods: {
    changeEdit() {
      this.isEdit = !this.isEdit
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('user/resetToken')
      console.log('login')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleEditUser() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    saveTruename() {

    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .userinfo{
    img{
      width: 144px;
      height: 144px;
      border-radius: 50%;
      margin-right: 60px;
    }
    .info{
      .edit{
        margin-left: 10px;
        cursor: pointer;
      }
      .ed{
        font-size: 12px;
        color: $textSecondary;
      }
      .truename{
        display: block;
        width: 80px;
      }
      input{
        width: 80px;
        color: $textSecondary;
        padding-left: 2px;
        line-height: 20px;
        outline: none;
        border-radius: 5px;
        border:1px solid $textSecondary;
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
