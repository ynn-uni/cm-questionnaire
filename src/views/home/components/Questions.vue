<template>
  <div class="home-questions">
    <div class="title">{{ role == 1 ? '推荐问卷' : '我的问卷' }}</div>

    <el-row v-if="questionList && questionList.length" :gutter="20">
      <el-col v-for="item in questionList" :key="item.id" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
    <NoData v-else :text="'暂无数据'" />
  </div>
</template>

<script>
import NoData from '@/components/NoData'
import QuestionItem from '@/components/QuestionItem'
import { getMySurveyList, getCourseSurveyList } from '@/api/survey'
import { listSortByKey } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeQuestions',
  components: { QuestionItem, NoData },
  data() {
    return {
      questionList: [],
      column: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 8
      }
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  mounted() {
    this.getSurveyList()
  },
  methods: {
    getSurveyList() {
      if (this.role === 1) {
        getCourseSurveyList().then(res => {
          this.questionList = listSortByKey(res, 'share', true).slice(0, 6)
        })
      } else {
        getMySurveyList({ page: 1, size: 6 }).then(res => {
          this.questionList = res.data
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: $textPrimary;
  margin-bottom: 30px;
}
</style>
