<template>
  <div class="teachercourse">
    <div class=" title flex justify-between" @click="handelMore">
      我的课程
      <el-link :underline="false" icon="iconfont icon-tj" class="add" @click="handelMore">
        添加课程
      </el-link>

    </div>
    <div class="courselist flex justify-between">
      <el-row v-if="courseList.length>0" :gutter="20">
        <CourseItem v-for="(item,index) in courseList" :key="index" :info="item" />
      </el-row>
      <div v-else class="nodata">
        暂无数据
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTeacherCourseList } from '@/api/course'
import CourseItem from '@/components/CourseItem'
export default {
  name: 'Home',
  components: {
    CourseItem
  },
  data() {
    return {
      courseList: [],
      date: '',
      count: 50,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    this.getTeacherCourse(1, 3)
  },
  methods: {

    handelMore() {
      this.$router.push('/course/addcourse')
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
    .nodata{
      font-size: 16px;
      color: $textPrimary;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
