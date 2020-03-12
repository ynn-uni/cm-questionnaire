<template>
  <div class="my-survey">
    <el-link class="survey-add" type="primary" :underline="false" @click="handleCourseSelect">
      <i class="el-icon-plus" /> 添加问卷
    </el-link>

    <el-row v-if="surveyList && surveyList.length" :gutter="20">
      <el-col v-for="(item,index) in surveyList" :key="index" v-bind="column">
        <QuestionItem :detail="item" deletable @delete="handleDeleteSurvey" />
      </el-col>
    </el-row>
    <NoData v-else text="暂无数据" />
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
import { getMySurveyList, delSurveyItem } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
import NoData from '@/components/NoData'
import Pagination from '@/components/Pagination'
import { filterStatus } from '@/utils'
export default {
  name: 'MySurveyList',
  components: { QuestionItem, Pagination, NoData },
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
      const role = this.$store.getters.role
      const getCourseMethod = role === 2 ? getTeacherCourseList : getStudentCourseList
      getCourseMethod({ page: 1, size: 100 }).then(res => {
        this.courseList = filterStatus(res.data, 'status', 1)
        this.dialogVisible = true
      })
    },
    confirmCourse() {
      if (!this.courseId) return
      this.dialogVisible = false
      this.$router.push({
        path: '/survey/create',
        query: {
          id: this.courseId
        }
      })
    },
    handleDeleteSurvey(evt) {
      const { id } = evt
      this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSurveyItem({ id }).then(() => {
          this.$message.success('删除成功！')
          this.curPage = 1
          this.getMySurveyList()
        })
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
