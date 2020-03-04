<template>
  <el-card class="survey-item" :class="{'is-focus': isFocus}" @click.native="handleClick">
    <div class="survey-item-header">
      <div class="flex">
        <span class="survey-index">{{ sequence }}</span>
        <ContentEditor v-model="question.title" class="survey-item-title" />
      </div>
      <div class="survey-item-action">
        <i class="el-icon-copy-document" @click="handleCopy" />
        <i class="el-icon-delete-solid" @click="handleDelete" />
      </div>
    </div>
    <div class="question-content">
      <SurveyRadio v-if="question.type === 1" :options="question.options" />
      <SurveyCheckbox v-if="question.type === 2" :options="question.options" />
      <SurveyInput v-if="question.type === 3" :placeholder="question.placeholder" />
    </div>
  </div>
  </el-card>
</template>

<script>
import ContentEditor from '@/components/ContentEditor'
import SurveyRadio from './Radio'
import SurveyCheckbox from './Checkbox'
import SurveyInput from './Input'
import shortid from 'shortid'
import cloneDeep from 'lodash.clonedeep'
export default {
  name: '',
  components: {
    ContentEditor,
    SurveyRadio,
    SurveyCheckbox,
    SurveyInput
  },
  props: {
    sequence: {
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
    handleDelete() {
      this.$confirm('删除后题目无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$emit('delete', {
          sequence: this.sequence,
          question: this.question
        })
      })
    },
    handleCopy() {
      this.$emit('copy', {
        sequence: this.sequence,
        question: this.cloneAndUpdateId(this.question)
      })
    },
    // 深拷贝问题，并重新生成id
    cloneAndUpdateId(data) {
      const result = cloneDeep(data)
      result.id = shortid.generate()
      // 更新选项中的id
      let { options } = result
      if (options) {
        options = options.map(i => {
          i.id = shortid.generate()
          return i
        })
      }
      return result
    }
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
      color: #666;
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
