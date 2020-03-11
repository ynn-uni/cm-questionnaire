<template>
  <div class="answer">
    <SurveyForm v-if="surveyData" :survey="surveyData" />
  </div>
</template>

<script>
import { getSurveyDetail } from '@/api/survey'
import SurveyForm from './components/SurveyForm'

export default {
  name: 'SurveyDetail',
  components: {
    SurveyForm
  },
  data() {
    return {
      id: '',
      uid: '',
      surveyData: null
    }
  },
  mounted() {
    this.handleRouteQuery()
    this.getSurveyDetail()
  },
  methods: {
    handleRouteQuery() {
      const query = this.$route.query
      const { id } = query
      this.id = id
    },
    getSurveyDetail() {
      getSurveyDetail({ id: this.id }).then(res => {
        console.log(res)
        this.surveyData = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  min-height: 100vh;
  padding: 45px;
  background: #efefef;
}
@media screen and (max-width: 768px) {
  .answer {
    padding: 15px;
  }
}
</style>
