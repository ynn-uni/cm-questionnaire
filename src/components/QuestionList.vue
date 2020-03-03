<template>
  <div class="questionlist">
    <el-row :gutter="20">
      <CourseItem v-for="(item,index) in 5" :key="index" />
    </el-row>
  </div>
</template>

<script>
import CourseItem from '@/components/QuestionItem'
export default {
  name: 'QuestionList',
  components: {
    CourseItem
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .questionlist{
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
     .el-row{
      width: 100%;
    }
  }
</style>
