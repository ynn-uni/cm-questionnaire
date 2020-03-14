<template>
  <div class="teachercourse">
    <div class=" title flex justify-between">
      我的课程
      <!-- <div class="lookmore">
        查看更多
        <i class="iconfont icon-arrow-right" />
        <i class="iconfont icon-arrow-right" />
      </div> -->
      <el-link :underline="false" class="lookmore" @click="handelMore">
        查看更多
        <i class="iconfont icon-arrow-right" />
        <i class="iconfont icon-arrow-right" />
      </el-link>
    </div>
    <div class="courselist flex justify-between">
      <el-row v-if="courseList.length>0" :gutter="20">
        <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" />
      </el-row>
      <NoData v-else :text="'暂无数据'" />
    </div>
  </div>
</template>

<script>
import { getTeacherCourseList } from '@/api/course'
import CourseItem from '@/components/CourseItem'
import NoData from '@/components/NoData'
export default {
  name: 'Home',
  components: {
    CourseItem,
    NoData
  },
  data() {
    return {
      courseList: [],
      date: ''
    }
  },
  mounted() {
    this.getTeacherCourse(1, 4)
  },
  methods: {
    handelMore() {
      this.$router.push('/course')
    },
    getTeacherCourse(page, size) {
      getTeacherCourseList({ page, size }).then((res) => {
        this.courseList = res.data
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
    .el-row{
      width: 100%;
    }
  }
}
</style>
