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
import { getShareSurveyList } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
export default {
  name: 'CourseSurveyList',
  components: { QuestionItem },
  data() {
    return {
      size: 8,
      curPage: 0,
      totalPage: 0,
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
    this.getShareSurveyList()
  },
  methods: {
    getShareSurveyList() {
      getShareSurveyList({ page: this.curPage, size: this.size }).then(res => {
        console.log(res)
        this.totalPage = res.page
        this.surveyList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
