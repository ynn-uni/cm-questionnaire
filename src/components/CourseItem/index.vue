<template>
  <div class="item flex">
    <div class="content">
      <div class="likelist flex align-center">
        <i
          v-for="(item,index) in 4"
          :key="index"
          class="iconfont icon-shoucang color-origin"
        />
        <i
          v-for="(item1,index1) in 1"
          :key="'kong'+index1"
          class="iconfont icon-shoucang2 color-origin"
        />
      </div>
      <div class="courseinfo flex align-center">
        <img class="ci-img" src="http://dummyimage.com/160x190" alt="">
        <div class="info">
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
            <div class="status">
              进行中
            </div>
            <div class="collect">
              <i class="iconfont icon-shoucang1" />
              收藏
            </div>
          </div>

        </div>
      </div>
      <div class="title">
        课程题目《运营之光》
      </div>
    </div>
    <!-- <div class="lookmore flex justify-center align-center">
      <i class="iconfont icon-yousanjiao color-rightarr" />
    </div> -->
  </div>
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

<style scoped lang="scss">
  .item{
    width: 650px;
    margin-right: 40px;
    .content{
      width: 620px;
      padding: 30px 40px;
      box-shadow: -2px -2px 16px #edf0f1;
      border-radius: 10px;
      .likelist{
        width: 100%;
        justify-content: flex-end;
        // padding-right: 25px;
        i{
          margin-left: 5px;
        }

      }
      .courseinfo{
          padding: 20px 0;
          .ci-img{
            margin-right: 75px;
          }
          .info{
            .info-item{
              font-size: 14px;
              line-height: 26px;
            }
            .other-option{
              margin-top: 20px;
              line-height: 30px;
              width: 290px;
              .status{
                width: 80px;

                text-align: center;
                font-size: 14px;
                border-radius: 5px;
                background-color: #fff;
                background-color: #68c200;
                color: #fff;

              }
              .collect{
                font-size: 14px;
                color:#9b9b9b;
              }
            }

          }
        }
    }

    .lookmore{
      box-shadow: 2px -2px 16px #edf0f1;
      // border:1px solid #edf0f1;
      background-color: #ffffff;
      margin-left: 4px;
      width: 35px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      .color-rightarr{
        color: #4a90e2;
        font-size: 14px;
      }
    }

  }
</style>
