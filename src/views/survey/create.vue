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
          <el-card v-for="(item, index) in questions" :key="index" class="survey-card">
            <SurveyItem ref="surveyItem" :index="index + 1" :question="item" />
          </el-card>
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
              v-model="title"
              class="survey-end-content"
              placeholder="您已完成本次问卷，感谢您的帮助与支持"
            />
            <el-button type="primary" size="small">发布</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <el-card class="settings-wrap" />
  </div>
</template>

<script>
import ContentEditor from '@/components/ContentEditor'
import SurveyItem from './components/SurveyItem'
import shortid from 'shortid'

export default {
  name: 'SurveyCreate',
  components: {
    ContentEditor,
    SurveyItem
  },
  data() {
    return {
      id: shortid.generate(),
      title: '',
      content: '',
      questions: []
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
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-wrap {
  display: flex;
  background: #efefef;
  .question-type,
  .settings-wrap {
    flex: 0 0 200px;
  }

  .question-type {
    display: flex;
    .question-btn-wrap {
      flex: 0 0 50%;
      margin-top: 10px;
    }
  }
  .survey-main {
    flex: 1;
    margin-left:10px;
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
