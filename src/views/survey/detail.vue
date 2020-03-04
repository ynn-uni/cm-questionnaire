<template>
  <div class="app-container">
    <SurveyForm :survey="surveyData" />
  </div>
</template>

<script>
import SurveyForm from './components/SurveyForm'
import surveyData from './data/data'

export default {
  name: 'SurveyDetail',
  components: {
    SurveyForm
  },
  data() {
    return {
      surveyData
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #efefef;
  overflow-y: scroll;
}
</style>
