<template>
  <div class="app-container">
    <el-alert type="info" title="当前为预览页面，答案不被记录。" center show-icon :closable="false" />
    <SurveyForm v-if="surveyData" :survey="surveyData" preview />
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
.app-container {
  background: #efefef;
  position: relative;
  .el-alert {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style>
