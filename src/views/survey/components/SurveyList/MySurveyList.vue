<template>
  <div class="my-survey">
    <el-link class="survey-add" type="primary" :underline="false" @click="handleCourseSelect">
      <i class="el-icon-plus" /> 添加问卷
    </el-link>
    <el-row :gutter="20">
      <el-col v-for="(item,index) in surveyList" :key="index" v-bind="column">
        <QuestionItem :detail="item" />
      </el-col>
    </el-row>
    <Pagination
      :page-count="pageCount"
      :page.sync="curPage"
      :size.sync="size"
      @pagination="getMySurveyList"
    />
    <el-dialog title="添加问卷" :visible.sync="dialogVisible" width="30%">
      <span>请选择课程：</span>
      <el-select v-model="courseId" placeholder="请选择">
        <el-option
          v-for="course in courseList"
          :key="course.id"
          :label="course.title"
          :value="course.id"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStudentCourseList, getTeacherCourseList } from '@/api/course'
import { getMySurveyList } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
import Pagination from '@/components/Pagination'
export default {
  name: 'MySurveyList',
  components: { QuestionItem, Pagination },
  data() {
    return {
      courseId: '',
      courseList: [],
      surveyList: [],
      // 分页
      pageCount: 0,
      curPage: 1,
      size: 9,
      dialogVisible: false,
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
    this.getMySurveyList()
  },
  methods: {
    getMySurveyList() {
      getMySurveyList({ page: this.curPage, size: this.size }).then(res => {
        this.surveyList = res.data
        this.pageCount = res.page
      })
    },
    handleCourseSelect() {
      const role = this.$store.getters.userInfo.type
      const getCourseMethod = role === 2 ? getTeacherCourseList : getStudentCourseList
      getCourseMethod({ page: 1, size: 100 }).then(res => {
        this.courseList = res.data
        this.dialogVisible = true
      })
    },
    confirmCourse() {
      this.dialogVisible = false
      this.$router.push({
        path: '/survey/create',
        query: {
          id: this.courseId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-survey {
  .survey-add {
    margin-top: 10px;
    margin-bottom: 20px;
    i {
      border: 1px solid currentColor;
    }
  }
}
</style>
