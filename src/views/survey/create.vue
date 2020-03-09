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
          <ContentEditor v-model="content" placeholder="点击编辑欢迎语及问卷描述" />
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
            <ContentEditor
              v-model="suffix"
              class="survey-end-content"
              placeholder="点击填写结束语"
            />
            <el-button type="primary" size="small" @click="handlePublishSurvey">发布</el-button>
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
            title: '单选题标题',
            type: 1,
            options: [
              {
                id: shortid.generate(),
                label: '选项1',
                has_open: false
              },
              {
                id: shortid.generate(),
                label: '选项2',
                has_open: false
              }
            ]
          }
          break
        case 2:
          question = {
            id: shortid.generate(),
            title: '多选题标题',
            type: 2,
            options: [
              {
                id: shortid.generate(),
                label: '选项1',
                has_open: false
              },
              {
                id: shortid.generate(),
                label: '选项2',
                has_open: false
              }
            ]
          }
          break

        case 3:
          question = {
            id: shortid.generate(),
            title: '填空题标题',
            placeholder: '提示内容',
            type: 3
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
      const { title, content, questions, suffix } = this
      const survey = {
        title,
        content,
        suffix,
        questions
      }
      console.log(survey)
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
