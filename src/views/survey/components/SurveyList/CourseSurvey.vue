<template>
  <div class="course-survey">
    <el-row v-if="surveyList && surveyList.length" :gutter="20">
      <el-col v-for="(item,index) in surveyList" :key="index" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
    <NoData v-else text="暂无数据" />
  </div>
</template>

<script>
import { getCourseSurveyList } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
import NoData from '@/components/NoData'
export default {
  name: 'CourseSurveyList',
  components: { QuestionItem, NoData },
  data() {
    return {
      // 分页
      pageCount: 0,
      curPage: 1,
      size: 9,
      surveyList: [],
      column: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 8
      }
    }
  },
  mounted() {
    this.getCourseSurveyList()
  },
  methods: {
    getCourseSurveyList() {
      getCourseSurveyList().then(res => {
        this.surveyList = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
