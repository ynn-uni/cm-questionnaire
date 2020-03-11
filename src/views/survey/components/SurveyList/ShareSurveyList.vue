<template>
  <div class="share-survey">
    <el-row v-if="surveyList && surveyList.length" :gutter="20">
      <el-col v-for="(item,index) in surveyList" :key="index" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
    <NoData v-else text="暂无数据" />
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
import NoData from '@/components/NoData'
export default {
  name: 'ShareSurveyList',
  components: { QuestionItem, Pagination, NoData },
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
