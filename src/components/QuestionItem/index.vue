<template>
  <div class="item flex align-center item">
    <div class="top flex align-center">
      <i class="iconfont icon-wenjuan my-icon" />
      <div class="info">
        <div class="title">{{ detail.title }}</div>
        <div class="other flex align-center justify-between">
          <!-- <div class="collect" :class="collect?'active':''" @click.stop="handelCollect">
            <i class="iconfont icon-shoucang1" />
            {{ collect?'取消收藏':'收藏' }}
          </div> -->
          <!-- <div class="share flex align-center">
              <i class="iconfont icon-fenxiang" />
              分享问卷
          </div>-->
        </div>
      </div>
    </div>
    <div class="status flex align-center justify-between">
      <el-tag type="success" effect="dark">进行中</el-tag>
      <!-- <div class="text">已收集问卷2份</div> -->
      <div class="collect" @click="shareSurvey">收集问卷</div>
    </div>
    <div class="fromcourse flex align-center justify-between">
      <div class="course">
        《{{ detail.ctitle }}》
      </div>
      <div class="date">{{ detail.start }}-{{ detail.end }}</div>
    </div>
  </div>
</template>

<script>
import { shareSurvey } from '@/api/survey'
export default {
  name: 'QuestionItem',
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      collect: false
    }
  },
  methods: {
    handelCollect() {
      this.collect = !this.collect
    },
    shareSurvey() {
      shareSurvey({ qid: 1 }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid rgba(181, 181, 181, 1);
  margin-bottom: 30px;
  width: 100%;
  flex-direction: column;
  // @include response-itemWidth();
  .top {
    width: 100%;
    height: 100%;
    .my-icon {
      color: $primaryColor;
      font-size: 44px;
      margin-right: 20px;
    }
    .info {
      width: 100px;
      flex-grow: 1;
      .title {
        width: 100%;
        font-size: 14px;
        color: $textPrimary;
        @include ellipsis;
      }
      .other {
        font-size: 12px;
        margin-top: 10px;
        height: 20px;
        .date {
          color: $textSecondary;
        }
        .collect,
        .share {
          color: $textSecondary;
          line-height: 20px;
          width: 80px;
          i {
            font-size: 20px;
            color: $textPrimary;
            margin-right: 2px;
          }
        }
        .active {
          i {
            color: #ffec0f;
          }
        }
        .share {
          color: $primaryColor;
        }
      }
    }
  }
  .status {
    width: 100%;
    margin-top: 2px;
    font-size: 14px;
    .el-tag {
      text-align: center;
      width: 70px;
      height: 25px;
      line-height: 25px;
    }
    .text {
      color: $textSecondary;
    }
    .collect {
      color: $primaryColor;
    }
  }
  .fromcourse {
    width: 100%;
    margin-top: 6px;
    padding-top: 6px;
    font-size: 15px;
    color: $textPrimary;
    border-top: 1px solid rgba(181, 181, 181, 1);
    .course {
      @include ellipsis;
      width: 300px;
    }
    .data {
      width: 156px;
    }
  }
}
</style>
