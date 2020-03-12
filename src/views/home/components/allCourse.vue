<template>
  <div class="teachercourse">
    <div class=" title flex justify-between">
      推荐课程
    </div>
    <div class="courselist flex justify-between">
      <el-row v-if="courseList.length>0" :gutter="20">
        <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" @changelist="changeQuestionList" />
      </el-row>
      <NoData v-else :text="'暂无数据'" />

    </div>
  </div>
</template>

<script>
import { getCourseList } from '@/api/course'
import CourseItem from '@/components/CourseItem'
import NoData from '@/components/NoData'
import { listSortByKey, filterStatus } from '@/utils'
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
    this.getAllCourse(1, 20)
  },
  methods: {
    handelMore() {
      this.$router.push('/course')
    },
    getAllCourse(page, size) {
      getCourseList({ page, size }).then((res) => {
        var list = filterStatus(res.data, 'status', 1)
        this.courseList = listSortByKey(list, 'join', true).slice(0, 3)
      })
    },
    changeQuestionList() {
      this.$emit('changelist')
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
