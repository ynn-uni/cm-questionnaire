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
        <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" />
      </el-row>
      <div v-else class="nodata">
        暂无数据
      </div>
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
import { getTeacherCourseList } from '@/api/course'
import CourseItem from '@/components/CourseItem'
import Pagination from '@/components/Pagination'
export default {
  name: 'Home',
  components: {
    CourseItem,
    Pagination
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
    .nodata{
      font-size: 16px;
      color: $textPrimary;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
