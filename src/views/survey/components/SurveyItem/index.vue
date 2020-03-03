<template>
  <div class="survey-item">
    <div class="survey-item-header">
      <div class="flex">
        <span class="survey-index">{{ index }}</span>
        <ContentEditor :value="question.title" class="survey-item-title" />
      </div>
      <div class="survey-item-action">
        <i class="el-icon-copy-document" />
        <i class="el-icon-delete-solid" />
      </div>
    </div>
    <div class="question-content">
      <SurveyRadio v-if="question.type === 1" :options="question.options" />
      <SurveyCheckbox v-if="question.type === 2" :options="question.options" />
      <SurveyInput v-if="question.type === 3" :placeholder="question.placeholder" />
    </div>
  </div>
</template>

<script>
import ContentEditor from '@/components/ContentEditor'
import SurveyRadio from './Radio'
import SurveyCheckbox from './Checkbox'
import SurveyInput from './Input'
export default {
  name: '',
  components: {
    ContentEditor,
    SurveyRadio,
    SurveyCheckbox,
    SurveyInput
  },
  props: {
    index: {
      type: Number,
      default: 1
    },
    question: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.survey-item {
  .survey-item-header {
    display: flex;
    justify-content: space-between;
    .survey-index {
      font-size: 20px;
      margin-right: 20px;
      line-height: 32px;
    }
    .survey-item-title {
      width: 400px;
    }
    .survey-item-action {
      line-height: 32px;
      > i {
        margin-right: 20px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: $--color-primary;
        }
      }
    }
  }
  .question-content {
    padding-left: 30px;
    .el-radio {
      display: block;
      margin-top: 10px;
    }
    .options-label {
      display: inline-block;
      width: 400px;
    }
  }

  & + .survey-item {
    margin-top: 20px;
  }
}
</style>
