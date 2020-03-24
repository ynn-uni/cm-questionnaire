<template>
  <div class="survey-wrap app-container">
    <el-card class="question-type">
      <div class="question-btn-wrap">
        <el-button plain size="small" @click="handleSelectType(1)">单选题</el-button>
      </div>
      <div class="question-btn-wrap">
        <el-button plain size="small" @click="handleSelectType(2)">多选题</el-button>
      </div>
      <div class="question-btn-wrap">
        <el-button plain size="small" @click="handleSelectType(3)">填空题</el-button>
      </div>
    </el-card>
    <div class="survey-main">
      <div class="survey-main-inner">
        <el-card>
          <ContentEditor v-model="title" placeholder="点击编辑问卷标题" />
          <ContentEditor v-model="content" placeholder="点击编辑欢迎语及问卷描述" richtext />
          <div class="survey-date">
            <el-date-picker
              v-model="start"
              type="date"
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择问卷开始日期"
            />
            <span>&nbsp;-&nbsp;</span>
            <el-date-picker
              v-model="end"
              type="date"
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="选择问卷结束日期"
            />
          </div>
        </el-card>

        <el-divider />

        <div v-if="questions.length">
          <draggable
            v-model="questions"
            handle=".el-icon-rank"
            @choose="disableTip = true"
            @unchoose="disableTip = false"
            @end="handleDragEndFocus"
          >
            <transition-group>
              <SurveyItem
                v-for="(item, index) in questions"
                :key="item.id"
                ref="surveyItem"
                :sequence="index + 1"
                :question="item"
                :disable-tip="disableTip"
                @blur="handleBlurItem"
                @focus="handleFocusItem"
                @copy="handleCopyItem"
                @delete="handleDeleteItem"
              />
            </transition-group>
          </draggable>
        </div>

        <div v-else class="survey-question-empty">
          <div>
            添加题目，请
            <i class="el-icon-thumb" />
            点击【题型】
          </div>
        </div>

        <el-divider />

        <el-card>
          <div class="survey-end">
            <ContentEditor v-model="suffix" class="survey-end-content" placeholder="点击填写结束语" richtext />
            <el-button type="primary" size="small" @click="handlePublishSurvey">添加问卷</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <div id="surveySetting" class="settings-wrap">
      <el-card v-if="focusIndex != null">
        <SurveySetting :question="questions[focusIndex]" :sequence="focusIndex + 1" />
      </el-card>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ContentEditor from '@/components/ContentEditor'
import SurveyItem from './components/SurveyItem'
import SurveySetting from './components/SurveySetting'
import shortid from 'shortid'
import { createSurvey } from '@/api/survey'

export default {
  name: 'SurveyCreate',
  components: {
    Draggable,
    ContentEditor,
    SurveyItem,
    SurveySetting
  },
  data() {
    return {
      id: shortid.generate(),
      title: '问卷标题',
      content: '',
      suffix: '您已完成本次问卷，感谢您的帮助与支持',
      questions: [],
      start: null,
      end: null,
      pickerOptions: {
        disabledDate: time => {
          if (this.start) {
            return time.getTime() < new Date(this.start).getTime()
          }
        }
      },
      disableTip: false,
      focusIndex: null
    }
  },
  mounted() {},
  methods: {
    handleSelectType(type) {
      let question = {}
      switch (type) {
        case 1:
          question = {
            id: shortid.generate(),
            title: '',
            type: 1,
            required: true,
            column: 1,
            options: [
              {
                id: shortid.generate(),
                label: ''
              },
              {
                id: shortid.generate(),
                label: ''
              }
            ]
          }
          break
        case 2:
          question = {
            id: shortid.generate(),
            title: '',
            type: 2,
            required: true,
            column: 1,
            options: [
              {
                id: shortid.generate(),
                label: ''
              },
              {
                id: shortid.generate(),
                label: ''
              }
            ]
          }
          break

        case 3:
          question = {
            id: shortid.generate(),
            title: '',
            placeholder: '',
            type: 3,
            required: true,
            nativetype: 'text'
          }
      }
      this.questions.push(question)
    },
    // 问题聚焦时，显示设置
    handleFocusItem(evt) {
      this.focusIndex = evt
    },
    // 问题失焦时，隐藏设置
    handleBlurItem(evt) {
      if (evt === this.focusIndex) {
        this.focusIndex = null
      }
    },

    // 拖动时变换焦点
    handleDragEndFocus(evt) {
      if (this.focusIndex !== null && this.focusIndex === evt.oldIndex) {
        this.focusIndex = evt.newIndex
      }
    },

    // 删除问卷题目
    handleDeleteItem(evt) {
      const { sequence } = evt
      this.questions.splice(sequence - 1, 1)
    },

    // 复制题目
    handleCopyItem(evt) {
      const { sequence, question } = evt
      this.questions.splice(sequence - 1, 0, question)
    },

    // 发布问卷
    handlePublishSurvey() {
      if (!this.questions.length) {
        this.$message.error('问卷题目不能为空！')
        return
      }
      this.checkDateSetting().then(() => {
        this.postSurvey()
      })
    },
    postSurvey() {
      const { title, content, questions, suffix, start, end } = this
      const survey = {
        cid: this.$route.query.id,
        title,
        content,
        suffix,
        questions,
        status: 1,
        start,
        end,
        sort: 0
      }
      createSurvey(survey).then(res => {
        this.$message({
          type: 'success',
          message: '发布成功!'
        })
        setTimeout(() => {
          this.$router.replace({
            path: '/survey/index'
          })
        })
      })
    },
    checkDateSetting() {
      const { start, end } = this
      if (!start || !end) {
        return this.$confirm(
          '您没有填写问卷的开始日期或结束日期, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            Promise.resolve()
          })
          .catch(() => {
            return Promise.reject()
          })
      }
      return Promise.resolve()
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-wrap {
  display: flex;
  background: #efefef;
  .question-type {
    flex: 0 0 200px;
    .question-btn-wrap {
      width: 100%;
      margin-top: 20px;
      .el-button {
        width: 100%;
      }
    }
  }
  .settings-wrap {
    flex: 0 0 300px;
    .el-card {
      height: 100%;
    }
  }
  .survey-main {
    flex: 1;
    min-width: 600px;
    margin-left: 10px;
    position: relative;
    overflow: hidden;

    // 隐藏混动条, 右侧由margin改为padding
    .survey-main-inner {
      position: absolute;
      left: 0;
      top: 0;
      right: -14px;
      bottom: 0;
      padding-right: 10px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .survey-date {
      text-align: right;
      margin-top: 20px;
    }

    .el-divider {
      margin: 16px 0;
    }

    .survey-question-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 40px;
      text-align: center;
      border: 1px dashed $--color-primary;
      border-radius: 4px;
      box-sizing: border-box;
      i {
        color: $--color-primary;
      }
    }

    .survey-end {
      margin-top: 10px;
      text-align: center;

      .survey-end-content {
        margin-bottom: 20px;
      }
    }
  }

  .el-card + .el-card {
    margin-top: 10px;
  }
}
</style>
