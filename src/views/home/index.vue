<template>
  <div class="home app-container">
    <div v-permission="1" class="title">
      推荐课程
    </div>
    <CourseList v-permission="1" :type="'all'" />
    <div v-permission="2" class="title flex justify-between" @click="handelMore">
      我的课程
      <div class="lookmore">
        查看更多
        <i class="iconfont icon-arrow-right" />
        <i class="iconfont icon-arrow-right" />
      </div>
    </div>
    <CourseList v-permission="2" :type="'all'" />
    <div v-permission="1" class="title">
      推荐问卷
    </div>
    <QuestionList v-permission="1" :type="'recommend'" />
    <div v-permission="2" class="title">
      我的问卷
    </div>
    <QuestionList v-permission="2" :type="'my'" />
    <div class="title flex justify-between">
      问卷统计
      <el-date-picker
        v-model="date"
        type="month"
        placeholder="选择月"
      />
    </div>
    <div class="charts">

      <VeLine
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseList from '@/components/CourseList'
import QuestionList from '@/components/QuestionList'
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'Home',
  components: {
    CourseList,
    QuestionList,
    VeLine
  },
  data() {
    return {
      date: '',
      chartData: {
        columns: ['日期', '问卷一', '问卷二', '问卷三'],
        rows: [
          { '日期': '3.1', '问卷一': 1393, '问卷二': 1093, '问卷三': 500 },
          { '日期': '3.2', '问卷一': 3530, '问卷二': 3230, '问卷三': 689 },
          { '日期': '3.3', '问卷一': 2923, '问卷二': 2623, '问卷三': 1895 },
          { '日期': '3.4', '问卷一': 1723, '问卷二': 1423, '问卷三': 789 },
          { '日期': '3.5', '问卷一': 3792, '问卷二': 3492, '问卷三': 2011 },
          { '日期': '3.6', '问卷一': 4593, '问卷二': 4293, '问卷三': 1203 }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {

  },
  methods: {
    handelMore() {
      this.$router.push('/course')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .title{
    font-size: 18px;
    color: $textPrimary;
    .lookmore{
      font-size: 14px;
      cursor: pointer;
      i{
        font-size: 10px;
      }
      &:hover{
        color: $primaryColor;
      }
    }
  }
}
</style>
