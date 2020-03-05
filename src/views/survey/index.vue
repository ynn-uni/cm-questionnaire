<template>
  <div class="app-container">
    <div>
      <router-link to="/survey/create">
        <el-button>创建问卷</el-button>
      </router-link>
      <router-link to="/survey/detail">
        <el-button>问卷详情</el-button>
      </router-link>
      <router-link to="/survey/result">
        <el-button>问卷结果</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveyIndex',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
