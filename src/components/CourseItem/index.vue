<template>

  <el-col :xl="8" :lg="12" :xs="24">
    <div class="item flex" @click="handelDetail('1')">
      <img class="ci-img" src="http://dummyimage.com/150x200" alt="">
      <div class="info">
        <div class="title flex justify-between align-center">
          <div class="title-text">
            运营之光
          </div>
          <div class="collect" :class="collect?'active':''" @click.stop="handelCollect">
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
          <el-button  type="primary" class="btn-enter" @click.stop="open">
            申请加入
          </el-button>
          <!-- <el-button v-permission="1" type="primary" class="btn-enter" @click.stop="open">
            申请加入
          </el-button>
          <el-button v-permission="2" type="primary" class="btn-enter" @click.stop="open">
            邀请学生
          </el-button> -->

        </div>

      </div>

    </div>
  </el-col>

</template>

<script>

export default {
  name: 'CourseItem',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collect: false
    }
  },
  mounted() {
    // console.log(permission)
  },
  methods: {

    handelDetail(id) {
      this.$router.push('/coursedetail/index')
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
    },
    handelCollect() {
      this.collect = !this.collect
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
  .bref{
    height: 220px;
    width: 500px;
    .title{
      font-size: 20px;
    }
  }
</style>
