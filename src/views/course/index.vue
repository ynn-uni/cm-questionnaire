<template>
  <div class="app-container course">
    <TeacherCourse v-permission="2" />

    <el-tabs v-model="activeName" v-permission="1">
      <el-tab-pane label="我的课程" name="my-course" lazy>
        <StudentCourse ref="mycourse" />
      </el-tab-pane>
      <el-tab-pane label="所有课程" name="all-course" lazy>
        <AllCourse @changelist="handlChangeMyCourseList" />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import AllCourse from './components/allCourse'
import TeacherCourse from './components/teacherCourse'
import StudentCourse from './components/studentCourse'
export default {
  components: {
    AllCourse,
    TeacherCourse,
    StudentCourse
  },

  data() {
    return {
      status: 0,
      courseList: [],
      activeName: 'my-course'
    }
  },
  mounted() {

  },
  methods: {
    handlChangeMyCourseList() {
      this.$refs.mycourse.getStudentCourse()
    }
  }
}
</script>
<style lang="scss" scoped>
.course::v-deep{
 .el-tabs__item {
   font-size: 18px;
 }
 .el-tabs__nav-wrap::after{
    content: none;
  }
}
</style>
