<template>
  <div class="home">
    <CourseList />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseList from './components/CourseList'
export default {
  name: 'Dashboard',
  components: {
    CourseList
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.home {
 padding-top: 30px;
 padding-left: 50px;
}
</style>
