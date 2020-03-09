<template>

  <el-col :xl="8" :lg="12" :xs="24">
    <div class="item flex" @click.stop="handelDetail(info.id)">
      <img class="ci-img" :src="baseUrl+info.cover" alt="">
      <div class="info">
        <div class="title flex justify-between align-center">
          <div class="title-text">
            {{ info.title }}
          </div>
          <!-- <div v-permission="1" class="collect" :class="info.collect?'active':''" @click.stop="handelCollect(info.id)">
            <i class="iconfont icon-shoucang1" />
            {{ info.collect==1?'取消收藏':'收藏' }}
          </div> -->
        </div>
        <div class="info-item">
          授课老师：{{ info.truename }}
        </div>
        <div class="info-item">
          课    时：{{ info.hour }}
        </div>
        <div class="info-item">
          考核方式：{{ info.check }}
        </div>
        <div class="info-item">
          学    分：{{ info.credit }}
        </div>
        <div class="other-option flex justify-between">
          <el-tag
            v-if="info.status==1"
            type="success"
            effect="dark"
          >
            进行中
          </el-tag>
          <el-tag
            v-if="info.status==2"
            type="info"
            effect="dark"
          >
            已结束
          </el-tag>

          <el-button v-if="info.status==1&&info.join==0" v-permission="1" type="primary" class="btn-enter" @click.stop="showAdd">
            申请加入
          </el-button>
          <el-button v-if="info.status==1" v-permission="2" type="primary" class="btn-enter" @click.stop="getCode">
            邀请学生
          </el-button>

        </div>

      </div>

    </div>
    <el-dialog
      title="请复制您的验证码"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="code">{{ info.code }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogVisible = false">取 消</el-button>
        <el-button
          v-clipboard:copy="info.code"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="primary"
          @click.stop="dialogVisible = false"
        >复制</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="请输入课程邀请码"
      :visible.sync="dialogVisible1"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <input v-model="code" type="text" class="addcode">
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click.stop="handelAddCourse"
        >申请加入</el-button>
      </span>
    </el-dialog>
  </el-col>

</template>

<script>
import { joinCourse } from '@/api/course'
import { addCousetOrCancleCollectrse } from '@/api/collect'
export default {
  name: 'CourseItem',
  props: {
    info: {
      type: Object,
      default: () => {}
    }

  },
  data() {
    return {
      collect: false,
      dialogVisible: false,
      dialogVisible1: false,
      code: '',
      baseUrl: process.env.VUE_APP_STATIC_IMG
    }
  },
  mounted() {
    // this.info.cover = process.env.VUE_APP_STATIC_IMG + this.info.cover
  },
  methods: {
    getCode() {
      this.dialogVisible = true
    },
    onCopy(e) {
      this.$message({
        type: 'success',
        message: '复制成功'
      })
      this.dialogVisible = false
    },
    onError(e) {
      console.log('复制失败！')
    },
    handelDetail(id) {
      this.$router.push({ path: '/course/coursedetail', query: { id }})
    },
    showAdd() {
      this.dialogVisible1 = true
    },
    handelAddCourse() {
      if (this.code) {
        joinCourse({ code: this.code }).then((res) => {
          this.$message.success('加入成功')
          this.info.join = 1
        })
        this.dialogVisible1 = false
      } else {
        this.$message.error('未填写邀请码')
      }
    },

    handelCollect(id) {
      addCousetOrCancleCollectrse({ type: 1, xid: id }).then((res) => {
        this.info.collect = this.info.collect === 1 ? 0 : 1
        this.$message.success(this.info.collect === 1 ? '收藏成功' : '取消收藏成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .item{
    cursor: pointer;
    margin-bottom: 30px;
    padding: 20px;
    width: 100%;
    height: 240px;
    box-shadow:2px 2px 8px 2px rgba(217,224,227,0.5);
    .ci-img{
      width: 150px;
      height: 200px;
      margin-right: 20px;
    }
   .info{
     flex-grow: 1;
     color:$textPrimary;
     line-height: 30px;
      .title{
        width: 100%;
        .title-text{
          font-size: 16px;
        }
        .collect{
          font-size: 14px;
          color: $textSecondary;
          width: 80px;
          i{
            font-size: 20px;
            color:$textPrimary;
          }

        }
        .active{
           i{
            color:#FFEC0F;
           }
          }

      }
      .info-item{
        font-size: 14px;
      }
      .other-option{
        height: 30px;
        margin-top: 18px;

      }

    }

  }
  .code{
    margin: 0 auto;
    width: 200px;
    text-align: center;
    padding-bottom: 2px;
    border-bottom: 1px solid $textSecondary;
  }
  .addcode{
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border:1px solid $textSecondary;
    display: block;
    margin: 0 auto;
    outline: none;
    padding-left: 5px;
  }
  .bref{
    height: 220px;
    width: 500px;
    .title{
      font-size: 20px;
    }
  }
</style>
