<template>
  <div v-if="loaded">
    <SurveyPage :is-edit="true" :detail="detail" @post="handlePost" />
  </div>
</template>

<script>
import SurveyPage from './components/SurveyPage'
import { editSurvey, getSurveyDetail } from '@/api/survey'
export default {
  name: 'SurveyEdit',
  components: { SurveyPage },
  data() {
    return {
      loaded: false,
      qid: null,
      detail: {}
    }
  },
  mounted() {
    this.handleQuery()
    this.getSurveyDetail()
  },
  methods: {
    handleQuery() {
      const { qid } = this.$route.query
      this.qid = Number(qid)
    },
    getSurveyDetail() {
      const id = this.qid
      getSurveyDetail({ id }).then(res => {
        this.detail = res
        this.loaded = true
      })
    },
    handlePost(survey) {
      const data = Object.assign({}, survey, { qid: this.detail.id })
      editSurvey(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        setTimeout(() => {
          this.$router.replace({
            path: '/survey/index'
          })
        }, 200)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
