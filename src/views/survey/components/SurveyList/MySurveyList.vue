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
import { getStudentCourseList } from '@/api/course'
import { getMySurveyList } from '@/api/survey'
import QuestionItem from '@/components/QuestionItem'
export default {
  name: 'MySurveyList',
  components: { QuestionItem },
  data() {
    return {
      courseId: '',
      courseList: [],
      surveyList: [],
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
      getMySurveyList({ page: 1, size: 3 }).then(res => {
        this.surveyList = res.data
      })
    },
    handleCourseSelect() {
      getStudentCourseList({ page: 1, size: 100 }).then(res => {
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
