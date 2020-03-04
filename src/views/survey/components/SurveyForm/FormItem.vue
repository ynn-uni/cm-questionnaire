<template>
  <el-form-item v-if="question.type" class="form-item" :prop="question.id" :rules="rules">
    <template slot="label">
      <h3>{{ question.title }}</h3>
    </template>
    <div v-if="question.type === 1">
      <el-radio-group v-model="provideData.formInfo[question.id]">
        <el-row :gutter="20">
          <el-col v-for="item in question.options" :key="item.id" :span="24 / question.column">
            <el-radio :label="item.id">{{ item.label }}</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
    </div>
    <div v-if="question.type === 2">
      <el-checkbox-group v-model="provideData.formInfo[question.id]">
        <el-row :gutter="20">
          <el-col v-for="item in question.options" :key="item.id" :span="24 / question.column">
            <el-checkbox :label="item.id">{{ item.label }}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>
    <div v-if="question.type === 3">
      <el-input v-model="provideData.formInfo[question.id]" :placeholder="question.placeholder">
        <template v-if="question && question.append" slot="append">{{ question.append }}</template>
      </el-input>
    </div>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    question: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  inject: ['provideData'],
  data() {
    return {}
  },
  computed: {
    rules() {
      const { type } = this.question
      const required = true
      if (type === 1) {
        return {
          required,
          message: '请选择',
          trigger: 'change'
        }
      }
      if (type === 2) {
        return {
          required,
          type: 'array',
          message: '请选择',
          trigger: 'change'
        }
      }

      if (type === 3) {
        return {
          required,
          message: '请填写',
          trigger: 'blur'
        }
      }
      return {}
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.form-item::v-deep {
  .el-form-item__label {
    text-align: unset;
    width: 100%;
    h3 {
      display: inline-block;
      margin-bottom: 0;
    }
  }
  .el-radio,
  .el-checkbox {
    line-height: 40px;
  }
  .el-input {
    max-width: 50%;
    margin-top: 10px;
  }
}
</style>
