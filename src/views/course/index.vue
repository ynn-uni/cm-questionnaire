<template>
  <div class="app-container course">
    <TeacherCourse v-permission="2" />

    <el-tabs v-model="activeName" v-permission="1">
      <el-tab-pane label="我的课程" name="first">
        <StudentCourse />
      </el-tab-pane>
      <el-tab-pane label="所有课程" name="second">
        <AllCourse />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {

  },
  methods: {

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
