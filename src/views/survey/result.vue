<template>
  <div class="app-container">
    <div class="survey-result">
      <h2>{{ surveyData.title }}</h2>
      <el-divider />
      <SurveyAnalysis
        v-for="(item, index) in surveyData.questions"
        :key="item.id"
        :sequence="index + 1"
        :question="item"
        :result="result"
      />
    </div>
  </div>
</template>

<script>
import SurveyAnalysis from './components/SurveyAnalysis'
import surveyData from './data/data'
export default {
  name: 'SurveyResult',
  components: { SurveyAnalysis },
  data() {
    return {
      surveyData,
      result: {
        total: 13,
        questions: {
          hImeAEuH: {
            AtJK6hlCC: 10,
            Pu9SjgE8m: 1
          },
          ceNBfmul: {
            Qhd24vCg4: 1,
            '9IcmVi2G1': 2,
            Qhd24vCg3: 0,
            '9IcmVi2GR': 0
          }
        }
      }
    }
  },
  mounted() {},
  methods: {}
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
