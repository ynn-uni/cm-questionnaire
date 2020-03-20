<template>
  <div class="teachercourse">
    <div class=" title flex justify-between">
      我的课程
      <el-link class="survey-add" type="primary" :underline="false" @click="handleAddCourse">
        <i class="el-icon-plus" /> 添加课程
      </el-link>

    </div>
    <div class="courselist flex justify-between">
      <el-row v-if="courseList.length>0" :gutter="20">
        <CourseItem v-for="(item,index) in courseList" :key="index" :deletable="true" :info="item" @delete="handleDeleteSurvey" />
      </el-row>
      <NoData v-else :text="'暂无数据'" />
      <Pagination
        v-if="courseList.length>0"
        :page-count="pageCount"
        :page.sync="curPage"
        :size.sync="size"
        @pagination="getTeacherCourse"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTeacherCourseList, delCourse } from '@/api/course'
import CourseItem from '@/components/CourseItem'
import Pagination from '@/components/Pagination'
import NoData from '@/components/NoData'
export default {
  name: 'Home',
  components: {
    CourseItem,
    Pagination,
    NoData
  },
  data() {
    return {
      courseList: [],
      // 分页
      pageCount: 0,
      curPage: 1,
      size: 9,
      column: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 8
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    this.getTeacherCourse()
  },
  methods: {
    handleDeleteSurvey(evt) {
      const id = evt
      this.$confirm('此操作将删除该课程及相关问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCourse({ id }).then(() => {
          this.$message.success('删除成功！')
          this.curPage = 1
          this.getTeacherCourse()
        })
      })
    },
    handleAddCourse() {
      this.$router.push('/course/addcourse')
    },
    getTeacherCourse() {
      getTeacherCourseList({ page: this.curPage, size: this.size }).then((res) => {
        this.courseList = res.data
        this.pageCount = res.page
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.teachercourse{
  .title{
    font-size: 18px;
    color: $textPrimary;
    .survey-add {
    margin-top: 10px;
    margin-bottom: 20px;
    i {
      border: 1px solid currentColor;
    }
  }

  }
  .courselist{
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
    .el-row{
      width: 100%;
    }
  }
}
</style>
