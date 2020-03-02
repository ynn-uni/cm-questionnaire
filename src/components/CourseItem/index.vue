<template>
  <el-popover
    trigger="hover"
    placement="right"
  >
    <div class="bref">
      <div class="title">
        运营之光
      </div>
      <div class="dis">
        已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦已经类名称建瓯市JF皮皮皮皮的烦烦烦烦烦烦
      </div>
    </div>
    <div slot="reference" class="item flex">
      <img class="ci-img" src="http://dummyimage.com/150x200" alt="">
      <div class="info">
        <div class="title flex justify-between align-center">
          <div class="title-text">
            运营之光
          </div>
          <div class="collect">
            <i class="iconfont icon-shoucang1" />
            取消收藏
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
          <el-button type="success">
            进行中
          </el-button>
          <el-button type="primary">
            申请加入
          </el-button>

        </div>

      </div>

    </div>
  </el-popover>
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

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  span{
    display: block;
    width: 30%;
    height: 240px;
  }
  .item{
    cursor: pointer;
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
          i{
            font-size: 20px;
            color:$textPrimary;
          }
        }
      }
      .info-item{
        font-size: 14px;
      }
      .other-option{
        height: 30px;
        margin-top: 18px;
       .el-button{
        padding: 0 20px;
       }
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
