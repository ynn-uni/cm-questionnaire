<template>
  <div class="app-container course">
    <el-tabs v-model="activeName">
      <el-tab-pane label="收藏课程" name="collect-course" lazy />
      <el-tab-pane label="收藏问卷" name="collect-survey" lazy />
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Collect',
  data() {
    return {
      activeName: 'collect-course'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
