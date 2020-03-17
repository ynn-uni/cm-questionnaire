<template>
  <div class="survey-setting">
    <div class="setting-title">Q{{ sequence }}. 题目设置</div>
    <div class="setting-section">
      <div class="setting-label">整题设置</div>
      <div class="setting-item">
        <div>此题必答</div>
        <div>
          <el-switch v-model="question.required" />
        </div>
      </div>
      <div v-if="type !== 3" class="setting-section">
        <div class="setting-label">选项设置</div>
        <div class="setting-item">
          <div>选项布局</div>
          <div>
            <el-radio-group v-model="question.column" size="mini">
              <el-radio-button :label="1" border>单列</el-radio-button>
              <el-radio-button :label="2" border>2列</el-radio-button>
              <el-radio-button :label="3" border>3列</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div v-if="type === 2" class="setting-item column">
          <div>可选范围</div>
          <div class="margin-top-10">
            <span>最少</span>
            <el-select v-model="question.min" placeholder="请选择" size="mini">
              <el-option
                v-for="item in question.options.length"
                :key="item"
                :label="item + '项'"
                :value="item"
              />
            </el-select>
            <span>&nbsp;&nbsp;最多</span>
            <el-select v-model="question.max" placeholder="请选择" size="mini">
              <el-option
                v-for="item in question.options.length"
                :key="item"
                :label="item + '项'"
                :value="item"
                :disabled="question.min > item"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div v-if="type === 3" class="setting-section">
        <div class="setting-label">填写限制</div>
        <div class="setting-item">
          <div>内容限制</div>
          <div>
            <el-select v-model="question.nativetype" class="content-limit" placeholder="请选择" size="mini">
              <el-option label="不限" value="text" />
              <el-option label="数字" value="number" />
              <el-option label="字母" value="char" />
              <el-option label="邮箱" value="email" />
              <el-option label="手机号" value="tel" />
            </el-select>
          </div>
        </div>
        <div class="setting-item">
          <div>最少填写</div>
          <div>
            <el-input v-model="question.minlength" size="mini" />
            <span>&nbsp;字</span>
          </div>
        </div>
        <div class="setting-item">
          <div>最多填写</div>
          <div>
            <el-input v-model="question.maxlength" size="mini" />
            <span>&nbsp;字</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveySetting',
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
      radio4: '',
      value: false
    }
  },
  computed: {
    type() {
      return this.question.type
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.survey-setting {
  .setting-title {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 2px;
    background-color: #495165;
  }

  .setting-label {
    margin-top: 30px;
    padding: 12px 18px 12px 0;
    color: #484848;
    font-size: 16px;
    border-bottom: 1px solid #dde5ed;
  }
  .setting-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    color: #707070;
    font-size: 13px;
    line-height: 28px;
    border-bottom: 1px solid #dde5ed;

    .el-input,
    .el-select {
      width: 6em;
    }
    .content-limit {
      width: 7em;
    }

    .margin-top-10 {
      margin-top: 10px;
    }
  }
  .column {
    flex-direction: column;
  }
}
</style>
