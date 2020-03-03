<template>
  <div class="coursedetail app-container">
    <div class="title">
      课程详情
    </div>
    <div class="item flex">
      <div class="item-left flex">
        <img class="ci-img" src="http://dummyimage.com/150x200" alt="">
        <div class="info">
          <div class="title flex justify-between align-center">
            <div class="title-text">
              运营之光
            </div>
            <div class="collect" :class="collect?'active':''" @click="handelCollect">
              <i class="iconfont icon-shoucang1" />
              {{ collect?'取消收藏':'收藏' }}
            </div>
          </div>
          <div class="info-item">
            授课老师：许娜
          </div>
          <div class="info-item">
            课    时：40课时
          </div>
          <div class="info-item">
            考核方式：笔试+作业
          </div>
          <div class="info-item">
            学    分：4分
          </div>
          <div class="other-option flex justify-between">
            <el-tag
              type="success"
              effect="dark"
            >
              进行中
            </el-tag>
            <el-button type="primary" class="btn-enter" @click="open">
              申请加入
            </el-button>

          </div>

        </div>
      </div>
      <div class="bref">
        <div class="dis-title">
          课程介绍
        </div>
        <div class="content">
          什么是用户体验度量？首先我们来看看何为度量？度量是一种测量或评价特定现象或事物的方法，让评测对象可观察、可量化，可变成一个数字或能够以某种方式予以计算的方法。
          那么运用到可用性研究领域，可用性度量的定义是它是一套可靠的测量体系，能够使被测量事物（内容与人及其行为或态度有关）能代表用户体验的某些方面，并以数字表示出来，并且可以持续观察、跟踪、和优化。即衡量和提升产品用户体验的质量。相信大家不少人应该听过谷歌的HEART模型和蚂蚁金服的PTECH模型.....
        </div>
      </div>
    </div>
    <div class="title">
      课程问卷
    </div>
    <QuestionList />
    <div class="title">
      我的同学
    </div>
    <ClassMate />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QuestionList from '@/components/QuestionList'
import ClassMate from './components/ClassMate'
export default {
  name: 'CourseDetail',
  components: {
    QuestionList,
    ClassMate
  },
  data() {
    return {
      collect: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handelCollect() {
      this.collect = !this.collect
    },
    open() {
      this.$prompt('请输入邀请码', {
        cancelButtonText: '取消',
        confirmButtonText: '申请加入'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '加入成功'
        })
      }).catch(() => {
      })
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
    flex-wrap: wrap;
    box-shadow:2px 2px 8px 2px rgba(217,224,227,0.5);
    .item-left{
      @include response-courseDetailWidth();
       height: 200px;
      border-right: 2px solid #ebebeb;
        .ci-img{
          width: 150px;
          height: 200px;
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
            margin-top: 18px;

          }

        }

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
