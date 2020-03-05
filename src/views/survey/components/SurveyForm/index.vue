<template>
  <div class="survey-form">
    <h2>{{ survey.title }}</h2>
    <div v-if="survey.content" class="form-tips">{{ survey.content }}</div>
    <el-divider />
    <el-form v-if="formInfo" ref="formInfo" :model="formInfo">
      <el-row v-for="question in survey.questions" :key="question.id" class="survey-section">
        <form-item :question="question" />
      </el-row>
    </el-form>
    <el-divider />
    <div v-if="survey.suffix" class="form-tips">{{ survey.suffix }}</div>
    <div class="survey-form-action">
      <el-button type="primary" size="medium" @click="submitForm">提交</el-button>
    </div>
  </div>
</template>

<script>
import FormItem from './FormItem'
export default {
  name: 'SurveyForm',
  provide() {
    return {
      provideData: this
    }
  },
  components: {
    FormItem
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formInfo: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.formInfo = this.defaultForm()
    })
  },
  methods: {
    defaultForm() {
      const result = {}
      if (!this.survey) return
      this.survey.questions.forEach(question => {
        const { id } = question
        if (question.type === 2) { // checkbox
          result[id] = []
        } else {
          result[id] = ''
        }
      })
      return result
    },
    submitForm() {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          const data = this.formatResult(this.formInfo)
          alert(JSON.stringify(data))
        }
      })
    },
    formatResult(data) {
      const result = {}
      const { questions } = this.survey
      questions.forEach(q => {
        result[q.id] = {
          type: q.type,
          data: data[q.id]
        }
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-form {
  max-width: 800px;
  padding: 30px;
  margin: auto;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;

  .form-tips {
    margin: 30px 0;
  }
  .el-divider {
    height: 2px;
    background: $--color-primary;
  }
  .survey-form-action {
    .el-button {
      width: 120px;
    }
  }
}
</style>
