<template>
  <div class="home app-container">
    <TeacherCourse v-permission="2" />
    <AllCourse v-permission="1" @changelist="handlChangeQuestionList" />
    <Questions ref="ques" />

    <!-- <div class="title flex justify-between">
      问卷统计
      <el-date-picker
        v-model="date"
        type="month"
        placeholder="选择月"
      />
    </div>-->
    <!-- <div class="charts">
      <VeLine
        :data="chartData"
      />
    </div>-->
  </div>
</template>

<script>
import TeacherCourse from './components/teacherCourse'
import AllCourse from './components/allCourse'
import Questions from './components/Questions'
// import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'Home',
  components: {
    Questions,
    TeacherCourse,
    AllCourse
  },
  data() {
    return {
      courseList: [],
      date: '',
      chartData: {
        columns: ['日期', '问卷一', '问卷二', '问卷三'],
        rows: [
          { 日期: '3.1', 问卷一: 1393, 问卷二: 1093, 问卷三: 500 },
          { 日期: '3.2', 问卷一: 3530, 问卷二: 3230, 问卷三: 689 },
          { 日期: '3.3', 问卷一: 2923, 问卷二: 2623, 问卷三: 1895 },
          { 日期: '3.4', 问卷一: 1723, 问卷二: 1423, 问卷三: 789 },
          { 日期: '3.5', 问卷一: 3792, 问卷二: 3492, 问卷三: 2011 },
          { 日期: '3.6', 问卷一: 4593, 问卷二: 4293, 问卷三: 1203 }
        ]
      }
    }
  },

  mounted() {
  },
  methods: {
    handlChangeQuestionList() {
      this.$refs.ques.getSurveyList()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .title {
    font-size: 18px;
    color: $textPrimary;
    .lookmore {
      font-size: 14px;
      cursor: pointer;
      i {
        font-size: 10px;
      }
      &:hover {
        color: $primaryColor;
      }
    }
  }
}
</style>
