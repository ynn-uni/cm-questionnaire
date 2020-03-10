<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的问卷" name="my-survey" lazy>
        <MySurveyList v-if="activeName === 'my-survey'" />
      </el-tab-pane>
      <el-tab-pane v-permission="1" label="分享问卷" name="share-survey" lazy>
        <ShareSurveyList v-if="activeName === 'share-survey'" />
      </el-tab-pane>
      <el-tab-pane v-permission="1" label="课程问卷" name="course-survey" lazy>
        <CourseSurvey v-if="activeName === 'course-survey'" />
      </el-tab-pane>
    </el-tabs>
    <!-- <router-link to="/survey/detail">
      <el-button>问卷详情</el-button>
    </router-link>
    <router-link to="/survey/result">
      <el-button>问卷结果</el-button>
    </router-link> -->
  </div>
</template>

<script>
import MySurveyList from './components/SurveyList/MySurveyList'
import CourseSurvey from './components/SurveyList/CourseSurvey'
import ShareSurveyList from './components/SurveyList/ShareSurveyList'
export default {
  name: 'SurveyIndex',
  components: {
    MySurveyList,
    ShareSurveyList,
    CourseSurvey
  },
  data() {
    return {
      activeName: 'my-survey'
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.app-container::v-deep {
  overflow-y: scroll;
}
</style>
