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
    <div v-if="isFocus && (question.type === 1 || question.type === 2)" class="quick-action">
      <div class="quick-action-item" @click="handleAddOption">
        <i class="el-icon-plus" />添加单个选项
      </div>
      <div class="quick-action-item">
        <i class="el-icon-document" />批量添加选项
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
    return {
      isFocus: false
    }
  },
  mounted() {},
  destroyed() {
    document.body.removeEventListener('click', this.handleEleBlur)
  },
  methods: {
    handleClick() {
      this.isFocus = true
      document.body.addEventListener('click', this.handleEleBlur)
    },
    handleEleBlur(evt) {
      // 检查是否包含于该根节点
      if (!this.$el.contains(evt.target)) {
        this.isFocus = false
      }
    },
    handleAddOption() {
      const length = this.question.options.length
      this.question.options.push({
        id: shortid.generate(),
        label: `选项${length + 1}`,
        has_open: false
      })
    },
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
  border: 2px solid transparent;
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

  .quick-action {
    display: flex;
    margin-top: 20px;
    padding: 0 30px;
    font-size: 14px;
    color: $--color-primary;
    .quick-action-item {
      margin-right: 30px;
      padding: 4px 5px;
      border-radius: 4px;
      cursor: pointer;
      i {
        margin-right: 5px;
      }
      &:hover {
        background: #eee;
      }
    }
  }

  &.is-focus {
    border: 2px solid $--color-primary;
  }
  & + .survey-item {
    margin-top: 20px;
  }
}
</style>