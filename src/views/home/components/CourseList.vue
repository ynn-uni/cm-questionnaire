<template>
  <div class="course flex">
    <CourseItem v-for="(item,index) in 2" :key="index" />
  </div>
</template>

<script>
import CourseItem from '@/components/CourseItem'
export default {
  name: 'CourseList',
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

</style>
