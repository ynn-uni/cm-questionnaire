<template>

  <el-col v-bind="column">
    <div class="item flex" @click.stop="handelDetail(info.id)">
      <img class="ci-img" :src="info.cover&&baseUrl+info.cover" alt="">
      <div class="info">
        <div class="title flex justify-between align-center">
          <div class="title-text">
            {{ info.title }}
          </div>
          <el-link
            v-if="deletable"
            v-permission="2"
            icon="el-icon-delete"
            :underline="false"
            @click.stop="handleDelete(info.id)"
          >删除</el-link>
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
            v-if="info.status==0"
            type="danger"
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
      title="请复制您的邀请码和链接"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="code">课程：《{{ info.title }}》</div>
      <div class="code">邀请码：{{ info.code }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogVisible = false">取 消</el-button>
        <el-button
          v-clipboard:copy="copyInfo"
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
    },
    deletable: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      url: null,
      collect: false,
      dialogVisible: false,
      dialogVisible1: false,
      code: '',
      baseUrl: process.env.VUE_APP_STATIC_IMG,
      column: {
        xs: 24,
        lg: 12,
        xl: 8
      }
    }
  },
  computed: {
    copyInfo() {
      const url = 'http://' + window.location.hostname + '/course/coursedetail?id=' + this.info.id
      return `欢迎加入《${this.info.title}》,\n链接地址：${url},\n邀请码：${this.info.code}`
    }
  },

  methods: {
    handleDelete(id) {
      this.$emit('delete', id)
    },
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
          this.$emit('changelist')
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
    min-width: 380px;
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
     position: relative;
      .title{
        width: 100%;
        .title-text{
          font-size: 16px;
        }
        .delete-button {
          position: absolute;
          width: 100px;
          height: 40px;
          top: 0;
          right: 0;
          color: $textPrimary;
          cursor: pointer;
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
    width: 400px;
    // text-align: center;
    font-size: 16px;
    line-height: 30px;
    padding-bottom: 2px;
    // border-bottom: 1px solid $textSecondary;
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
