<template>
  <div class="answer">
    <SurveyForm v-if="surveyData" :survey="surveyData" @answer="submitAnswer" />
  </div>
</template>

<script>
import { getSurveyDetail, postSurveyAnswer } from '@/api/survey'
import SurveyForm from './components/SurveyForm'
import querystring from 'querystring'

export default {
  name: 'SurveyDetail',
  components: {
    SurveyForm
  },
  data() {
    return {
      id: null,
      uid: null,
      surveyData: null
    }
  },
  mounted() {
    this.handleRouteQuery()
    this.getSurveyDetail()
  },
  methods: {
    handleRouteQuery() {
      const { ids } = this.$route.params
      const { id, uid } = querystring.parse(atob(ids))
      this.id = id
      this.uid = uid
    },
    getSurveyDetail() {
      getSurveyDetail({ id: this.id }).then(res => {
        this.surveyData = res
      })
    },
    submitAnswer(evt) {
      const { answer } = evt
      postSurveyAnswer({
        qid: this.id,
        uid: this.uid,
        answer
      }).then(() => {
        // TODO 跳转完成页面
        this.$message.success('您的答卷已经提交，感谢您的参与！')
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
