<template>
  <div class="course flex justify-between">
    <el-row v-if="courseList.length>0" :gutter="20">
      <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" :type1="type" />
    </el-row>
    <div v-else class="nodata">
      暂无数据
    </div>
  </div>
</template>

<script>
import CourseItem from '@/components/CourseItem'
import { teacherGetCourse, getCourseList, getStudentCourseList } from '@/api/course'
import { mapGetters } from 'vuex'
export default {
  name: 'CourseList',
  components: {
    CourseItem
  },
  props: {
    type: {
      type: String,
      default: ''
    }
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
  watch: {
    $route() {
      this.getCourseList()
    },
    type() {
      this.getCourseList()
    }
  },

  mounted() {
    this.getCourseList()
    // setTimeout(() => {
    //   this.getCourseList()
    // }, 1000)
  },
  methods: {
    getCourseList() {
      var routename = this.$route.name
      // 老师首页课程列表
      if (this.userInfo.type === 2 && routename === 'Home' && this.type === 'my') {
        this.getTeacherCourse(1, 3)
      } else if (this.userInfo.type === 2 && routename === 'Course' && this.type === 'my') { // 老师我的课程列表
        this.getTeacherCourse(1, 9)
      } else if (this.userInfo.type === 1 && this.type === 'all') { // 学生获取所有课程
        this.getAllCourse(1, 3)
      } else if (this.userInfo.type === 1 && routename === 'Course' && this.type === 'my') { // 学生获取所有课程
        this.getStudentCourse(1, 9)
      }
    },
    getTeacherCourse(page, size) {
      teacherGetCourse({ page, size }).then((res) => {
        this.courseList = res.data
        console.log(this.courseList)
      })
    },
    getAllCourse(page, size) {
      getCourseList({ page, size }).then((res) => {
        console.log(res)
        this.courseList = res.data
      })
    },
    getStudentCourse(page, size) {
      getStudentCourseList({ page, size }).then((res) => {
        console.log(res)
        this.courseList = res.data
      })
    },
    changeType() {
      this.type = 'all'
      this.getCourseList()
    }

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
    .nodata{
      font-size: 16px;
      color: $textPrimary;
      text-align: center;
      width: 100%;
    }
  }
</style>
