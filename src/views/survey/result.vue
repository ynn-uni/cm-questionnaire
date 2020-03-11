<template>
  <div class="app-container">
    <div v-if="loaded" class="survey-result">
      <h2>{{ surveyData.title }}</h2>
      <el-divider />
      <SurveyAnalysis
        v-for="(item, index) in surveyData.questions"
        :key="item.id"
        :sequence="index + 1"
        :question="item"
        :result="result"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import SurveyAnalysis from './components/SurveyAnalysis'
import { getSurveyDetail, getSuveryAnalysis } from '@/api/survey'

export default {
  name: 'SurveyResult',
  components: { SurveyAnalysis },
  data() {
    return {
      id: null,
      surveyData: null,
      loaded: false,
      total: 0,
      result: []
    }
  },
  mounted() {
    this.handleRouterQuery()
    const p1 = this.getSurveyDetail()
    const p2 = this.getSuveryAnalysis()
    Promise.all([p1, p2]).then(() => {
      this.loaded = true
    })
  },
  methods: {
    handleRouterQuery() {
      const query = this.$route.query
      const { id } = query
      this.id = id
    },
    getSurveyDetail() {
      return getSurveyDetail({ id: this.id }).then(res => {
        this.surveyData = res
      })
    },
    getSuveryAnalysis() {
      return getSuveryAnalysis({ qid: this.id }).then(res => {
        this.result = res.data
        this.total = res.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #eee;
  overflow-y: scroll;

  .survey-result {
    max-width: 800px;
    padding: 30px;
    margin: auto;
    background: #fff;
    h2 {
      margin-top: 0;
      text-align: center;
    }
  }

  .el-divider {
    height: 2px;
    background: $--color-primary;
  }
}
</style>
