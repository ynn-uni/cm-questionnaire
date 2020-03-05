<template>
  <div class="survey-analysis">
    <div class="survey-analysis-title">
      <b>第{{ sequence }}题:</b>
      {{ question.title }}
      <span>[ {{ question.type | questionType }} ]</span>
    </div>
    <div class="survey-analysis-chart">
      <el-table :data="tableData" border show-summary sum-text="本题有效填写人数">
        <el-table-column label="选项" prop="title" />
        <el-table-column label="小计" prop="count" sortable />
        <el-table-column label="比例">
          <template slot-scope="{row}">
            <el-progress :stroke-width="10" :percentage="getPercentage(row.count)" />
          </template>
        </el-table-column>
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
    result: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableData: [
        {
          title: '选项1',
          count: 1
        },
        {
          title: '选项2',
          count: 3
        },
        {
          title: '选项3',
          count: 1
        }
      ]
    }
  },
  mounted() {},
  methods: {
    getPercentage(value) {
      console.log(value, this.result.total)
      return (value / this.result.total).toFixed(2) * 100
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-analysis::v-deep {
  .survey-analysis-title {
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
