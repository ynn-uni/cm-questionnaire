<template>
  <div class="course-survey">
    <el-row :gutter="20">
      <el-col v-for="(item,index) in surveyList" :key="index" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
    <Pagination
      :page-count="pageCount"
      :page.sync="curPage"
      :size.sync="size"
      @pagination="getShareSurveyList"
    />
  </div>
</template>

<script>
import { getShareSurveyList } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
import Pagination from '@/components/Pagination'
export default {
  name: 'CourseSurveyList',
  components: { QuestionItem, Pagination },
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
    this.getShareSurveyList()
  },
  methods: {
    getShareSurveyList() {
      getShareSurveyList({ page: this.curPage, size: this.size }).then(res => {
        this.pageCount = res.page
        this.surveyList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
