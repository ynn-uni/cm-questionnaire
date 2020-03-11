<template>
  <div class="teachercourse">
    <div class="courselist flex justify-between">
      <el-row v-if="courseList.length>0" :gutter="20">
        <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" @changelist="changeStudentCourseList" />
      </el-row>
      <NoData v-else :text="'暂无数据'" />
      <Pagination
        v-if="courseList.length>0"
        :page-count="pageCount"
        :page.sync="curPage"
        :size.sync="size"
        @pagination="getAllCourse"
      />
    </div>
  </div>
</template>

<script>
import { getCourseList } from '@/api/course'
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
  mounted() {
    this.getAllCourse()
  },
  methods: {
    changeStudentCourseList() {
      this.$emit('changelist')
    },
    getAllCourse() {
      getCourseList({ page: this.curPage, size: this.size }).then((res) => {
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
    .lookmore{
      font-size: 14px;
      cursor: pointer;
      i{
        font-size: 10px;
      }
      &:hover{
        color: $primaryColor;
      }
    }
  }
  .courselist{
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 6px;
    .el-row{
      width: 100%;
    }
  }
}
</style>
