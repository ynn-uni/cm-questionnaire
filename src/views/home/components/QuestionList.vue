<template>
  <div class="questionlist flex justify-between">
    <CourseItem v-for="(item,index) in 3" :key="index" />
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
    margin: 30px 0;
  }
</style>
