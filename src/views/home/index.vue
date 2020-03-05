<template>
  <div class="home app-container">
    <div v-permission="1" class="title">
      推荐课程
    </div>
    <div v-permission="2" class="title">
      我的课程
    </div>
    <CourseList />
    <div v-permission="1" class="title">
      推荐问卷
    </div>
    <div v-permission="2" class="title">
      我的问卷
    </div>
    <QuestionList />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseList from '@/components/CourseList'
import QuestionList from '@/components/QuestionList'
export default {
  name: 'Home',
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
    font-size: 18px;
    color: $textPrimary;
  }
}
</style>
