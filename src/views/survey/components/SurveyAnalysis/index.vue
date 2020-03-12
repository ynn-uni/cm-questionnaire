<template>
  <div class="survey-analysis">
    <div class="survey-analysis-title">
      <b>第{{ sequence }}题:</b>
      <span>[ {{ question.type | questionType }} ]</span>
      <span v-html="question.title" />
    </div>
    <div v-if="question.type !== 3" class="survey-analysis-chart">
      <el-table :data="tableData" border show-summary :summary-method="getSummaries">
        <el-table-column label="选项" prop="title" />
        <el-table-column label="小计" prop="count" sortable />
        <el-table-column label="比例">
          <template slot-scope="{row}">
            <el-progress :stroke-width="10" :percentage="getPercentage(row.count)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="答案" prop="answer" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveyAnalysis',
  filters: {
    questionType(value) {
      switch (value) {
        case 1:
          return '单选题'
        case 2:
          return '多选题'
        case 3:
          return '填空题'
      }
    }
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
    total: {
      type: Number,
      default: 0
    },
    result: {
      type: [Array, Object],
      default: () => {}
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    defaultTableData() {
      const options = this.question.options
      if (!options) {
        return []
      }
      return options.map(i => {
        return {
          title: i.label,
          count: 0
        }
      })
    },
    getTableData() {
      let table = []
      const { id, type, options } = this.question
      const questionResult = this.result && this.result[id]
      if (!questionResult) return
      if (type === 3) {
        table = questionResult.map(i => {
          return { answer: i }
        })
      } else {
        table = options.map(i => {
          return {
            title: i.label,
            count: questionResult[i.id] || 0
          }
        })
      }
      return table
    }
  },
  mounted() {
    this.tableData = this.total ? this.getTableData : this.defaultTableData
  },
  methods: {
    getPercentage(value) {
      let res = 0
      if (this.total) {
        res = (value / this.total) * 100
      }
      return +res.toFixed(0)
    },
    getSummaries(param) {
      return ['本题有效填写人数', this.total]
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-analysis::v-deep {
  .survey-analysis-title {
    margin-top: 20px;
    margin-bottom: 20px;
    b {
      margin-right: 10px;
    }
    span {
      color: #666;
      margin-left: 10px;
    }
  }
  .survey-analysis-chart {
    margin-bottom: 20px;
  }
  .el-table th,
  .el-table td {
    padding: 6px 0;
  }
}
</style>
