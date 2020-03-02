<template>
  <div class="home app-container">
    <div class="title">
      推荐课程
    </div>
    <CourseList />
    <div class="title">
      推荐问卷
    </div>
    <QuestionList />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseList from './components/CourseList'
import QuestionList from './components/QuestionList'
export default {
  name: 'Dashboard',
  components: {
    CourseList,
    QuestionList
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
  .title{
    font-size: 20px;
    color: #4a4a4a;
  }
}
</style>
