<template>
  <div>
    <SurveyPage @post="handlePost" />
  </div>
</template>

<script>
import SurveyPage from './components/SurveyPage'
import { createSurvey } from '@/api/survey'
export default {
  name: 'SurveyCreate',
  components: { SurveyPage },
  data() {
    return {
      cid: null
    }
  },
  mounted() {
    this.cid = Number(this.$route.query.cid)
  },
  methods: {
    handlePost(survey) {
      const data = Object.assign({}, survey, { cid: this.cid })
      createSurvey(data).then(res => {
        this.$message({
          type: 'success',
          message: '创建成功!'
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
