<template>
  <div class="coursedetail app-container">
    <div class="title">
      课程详情
    </div>
    <div class="item flex">
      <div class="item-left flex">
        <img class="ci-img" :src="baseUrl+data.cover" alt="">
        <div class="info">
          <div class="title flex justify-between align-center">
            <div class="title-text">
              {{ data.title }}
            </div>
            <div v-permission="1" class="collect" :class="collect?'active':''" @click="handelCollect">
              <i class="iconfont icon-shoucang1" />
              {{ collect?'取消收藏':'收藏' }}
            </div>
          </div>
          <div class="info-item">
            授课老师：{{ data.truename }}
          </div>
          <div class="info-item">
            课    时：{{ data.hour }}
          </div>
          <div class="info-item">
            考核方式：{{ data.check }}
          </div>
          <div class="info-item">
            学    分：{{ data.credit }}
          </div>
          <div v-permission="1" class="other-option flex justify-between">
            <el-tag
              v-if="data.status==1"
              type="success"
              effect="dark"
            >
              进行中
            </el-tag>
            <el-tag
              v-if="data.status==2"
              type="info"
              effect="dark"
            >
              已结束
            </el-tag>
            <el-button v-permission="1" type="primary" class="btn-enter" @click="showAdd">
              申请加入
            </el-button>

          </div>
          <div v-permission="2" class="other-option">
            <el-tag
              v-if="data.status==1"
              type="success"
              effect="dark"
            >
              进行中
            </el-tag>
            <el-tag
              v-if="data.status==2"
              type="info"
              effect="dark"
            >
              已结束
            </el-tag>
            <div v-permission="2" class="other-option flex justify-between">
              <el-button v-if="data.status==1" type="primary" class="btn-enter" @click="getCode">
                邀请学生
              </el-button>
              <el-button type="primary" class="btn-enter" @click="editCourse">
                编辑课程
              </el-button>
            </div>
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
        <div class="code">{{ data.code }}</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click.stop="dialogVisible = false">取 消</el-button>
          <el-button
            v-clipboard:copy="data.code"
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
      <div class="bref">
        <div class="dis-title">
          课程介绍
        </div>
        <div class="content">
          {{ data.describe }}
        </div>
      </div>
    </div>
    <div class="title">
      课程问卷
    </div>
    <QuestionList />
    <div v-permission="1" class="title">
      我的同学
    </div>
    <div v-permission="2" class="title">
      我的学生
    </div>
    <ClassMate />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QuestionList from '@/components/QuestionList'
import ClassMate from './components/ClassMate'
import { getCourseDetails, joinCourse } from '@/api/course'
export default {
  name: 'CourseDetail',
  components: {
    QuestionList,
    ClassMate
  },
  data() {
    return {
      collect: false,
      data: {},
      dialogVisible: false,
      dialogVisible1: false,
      code: '',
      baseUrl: process.env.VUE_APP_STATIC_IMG
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },

  mounted() {
    console.log(this.$route.query.id)
    getCourseDetails({ id: this.$route.query.id }).then((res) => {
      console.log(res)
      this.data = res.data
    })
  },
  methods: {
    handelCollect() {
      this.collect = !this.collect
    },
    editCourse() {
      this.$router.push({ path: '/course/editcourse', query: { id: this.data.id }})
    },
    getCode() {
      this.dialogVisible = true
    },
    onCopy(e) {
      this.$message({
        type: 'success',
        message: '复制成功'
      })
    },
    onError(e) {
      console.log('复制失败！')
    },
    showAdd() {
      this.dialogVisible1 = true
    },
    handelAddCourse() {
      if (this.code) {
        const code = this.code
        joinCourse({ code }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.$message.success('加入成功')
          }
        })
        this.dialogVisible1 = true
      } else {
        this.$message.error('未填写邀请码')
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.coursedetail {
  .title{
    font-size: 20px;
    color: $textPrimary;
  }
  .item{
    margin: 30px 0;
    padding: 20px;
    width: 100%;
    // height: 280px;
    flex-wrap: wrap;
    box-shadow:2px 2px 8px 2px rgba(217,224,227,0.5);
    .item-left{
      @include response-courseDetailWidth();
      //  height: 200px;
      border-right: 2px solid #ebebeb;
        .ci-img{
          width: 150px;
          height: 230px;
          margin-right: 20px;
        }
      .info{
        width: 240px;
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
              cursor: pointer;
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
            margin-top: 8px;
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
    padding-left: 5px;
    outline: none;

  }
    .bref{
      @include response-courseDetailWidth();
       height: 200px;
      padding-left:20px;
      color: $textPrimary;
      text-align: justify;
      line-height: 20px;

      .dis-title{
        font-size: 18px;
        margin-bottom: 10px;
      }
      .content{
        text-indent: 28px;
        font-size: 14px;
      }
    }
  }

}
</style>
