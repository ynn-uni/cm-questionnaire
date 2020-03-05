<template>
  <div class="course flex justify-between">
    <el-row :gutter="20">
      <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" />
    </el-row>
  </div>
</template>

<script>
import CourseItem from '@/components/CourseItem'
import { teacherGetCourse } from '@/api/course'
import { mapGetters } from 'vuex'
export default {
  name: 'CourseList',
  components: {
    CourseItem
  },
  props: {

  },
  data() {
    return {
      courseList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    console.log(this.userInfo)
    if (this.userInfo.type === 2) {
      teacherGetCourse({ page: 1, size: 3 }).then((res) => {
        this.courseList = res.data.data
        console.log(this.courseList)
      })
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .course{
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
    .el-row{
      width: 100%;
    }
  }
</style>
