<template>
  <div class="item flex align-center">
    <i class="iconfont icon-wenjuan my-icon" />
    <div class="info">
      <div class="title">
        关于新冠病毒疫情后工业设计发展趋势问卷调查研关于新冠病毒疫情后工业设计发展趋势问卷调查研
      </div>
      <div class="other flex align-center justify-between">
        <div class="date">
          2020.02.20-2020.03.15
        </div>
        <div class="collect flex align-center">
          <i class="iconfont icon-shoucang1" />
          取消收藏
        </div>
        <div class="share flex align-center">
          <i class="iconfont icon-fenxiang" />
          取消收藏
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionItem',
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
  .item{
    cursor: pointer;
    padding: 20px;
    width: 30%;
    height:85px;
    border-radius:4px;
    border:1px solid rgba(181,181,181,1);

    .my-icon{
      color:$primaryColor;
      font-size: 44px;
      margin-right: 20px;
    }
    .info{
      width: 100px;
      flex-grow: 1;
      .title{
        width: 100%;
        font-size: 14px;
        color: $textPrimary;
        @include ellipsis;
      }
      .other{
        font-size: 12px;
        margin-top: 10px;
        height: 20px;
        .date{
          color:$textSecondary;
        }
        .collect,.share{
          color: $textSecondary;
          line-height: 20px;
          i{
            font-size: 20px;
            color:$textPrimary;
            margin-right: 2px;
          }
        }
        .share{
          color: $primaryColor;
        }
      }
    }
  }
</style>
