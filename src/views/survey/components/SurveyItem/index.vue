<template>
  <el-card class="survey-item" :class="{'is-focus': isFocus}" @click.native="handleClick">
    <div class="survey-item-header">
      <div class="survey-item-editor">
        <span class="survey-index">{{ sequence }}</span>
        <ContentEditor v-model="question.title" class="survey-item-title" richtext placeholder="请填写标题" />
      </div>
      <div class="survey-item-action">
        <el-tooltip content="长按拖动" placement="top" effect="light" :disabled="disableTip">
          <i class="el-icon-rank" />
        </el-tooltip>
        <el-tooltip content="复制" placement="top" effect="light" :disabled="disableTip">
          <i class="el-icon-copy-document" @click="handleCopy" />
        </el-tooltip>
        <el-tooltip content="删除" placement="top" effect="light" :disabled="disableTip">
          <i class="el-icon-delete-solid" @click="handleDelete" />
        </el-tooltip>
      </div>
    </div>
    <div class="question-content">
      <SurveyRadio v-if="question.type === 1" :options="question.options" :column="question.column" @enter="handleAddOption" />
      <SurveyCheckbox v-if="question.type === 2" :options="question.options" :column="question.column" @enter="handleAddOption" />
      <SurveyInput v-if="question.type === 3" :placeholder="question.placeholder" />
    </div>
    <div v-if="isFocus && (question.type === 1 || question.type === 2)" class="quick-action">
      <div class="quick-action-item" @click="handleAddOption">
        <i class="el-icon-plus" />添加单个选项
      </div>
      <!-- <div class="quick-action-item">
        <i class="el-icon-document" />批量添加选项
      </div> -->
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
    },
    disableTip: {
      type: Boolean,
      default: false
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
      this.$emit('focus', this.sequence - 1)
      document.body.addEventListener('click', this.handleEleBlur)
    },
    handleEleBlur(evt) {
      // 检查点击是否包含于该根节点, 且不在设置区域
      const settingDom = document.getElementById('surveySetting')
      if (settingDom.contains(evt.target)) return
      if (!this.$el.contains(evt.target)) {
        this.isFocus = false
        this.$emit('blur', this.sequence - 1)
      }
    },
    handleAddOption(index) {
      if (typeof index === 'number') {
        this.question.options.splice(index + 1, 0, {
          id: shortid.generate(),
          label: ''
        })
      } else {
        this.question.options.push({
          id: shortid.generate(),
          label: ''
        })
      }
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
  overflow: unset;

  .survey-item-header {
    display: flex;
    justify-content: space-between;
    .survey-index {
      font-size: 20px;
      margin-right: 20px;
      line-height: 32px;
    }
    .survey-item-editor {
      width: calc(100% - 140px);
    }
    .survey-item-title {
      display: inline-block;
      width: calc(100% - 40px);
    }
    .survey-item-action {
      color: #666;
      line-height: 32px;
      > i {
        margin-right: 15px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: $--color-primary;
        }
      }
    }
  }
  .question-content {
    margin: 5px 0;
    padding-left: 30px;
    overflow: hidden;
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
    margin-top: 10px;
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
