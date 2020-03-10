<template>
  <div class="course-survey">
    <el-row :gutter="20">
      <el-col v-for="(item,index) in surveyList" :key="index" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCourseSurveyList } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
export default {
  name: 'CourseSurveyList',
  components: { QuestionItem },
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
      getCourseSurveyList({ page: this.curPage, size: this.size }).then(res => {
        this.surveyList = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
