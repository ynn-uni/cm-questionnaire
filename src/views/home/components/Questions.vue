<template>
  <div class="home-questions">
    <div class="title">{{ role == 1 ? '推荐问卷' : '我的问卷' }}</div>

    <el-row :gutter="20">
      <el-col v-for="item in questionList" :key="item.id" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QuestionItem from '@/components/QuestionItem'
import { getMySurveyList, getCourseSurveyList } from '@/api/survey'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeQuestions',
  components: { QuestionItem },
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
      const getMethod = this.role === 1 ? getCourseSurveyList : getMySurveyList
      getMethod().then(res => {
        this.questionList = res.slice(0, 6)
      })
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
