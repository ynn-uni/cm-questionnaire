<template>
  <el-col
    v-if="display"
    class="survey-form-item"
    :span="config.span || 24"
    :offset="config.offset || 0"
  >
    <el-form-item
      v-if="config.type"
      v-bind="{
        prop: itemKey,
        rules: rules,
        ...config.formItemAttrs
      }"
    >
      <div v-if="config.tips" class="form-tips">{{ config.tips }}</div>
      <div v-if="config.slot">
        <slot :name="config.slot" />
      </div>
      <div v-if="config.type === 'date'">
        <el-date-picker
          v-model="provideData.formInfo[itemKey]"
          v-bind="{
            placeholder: '请选择',
            ...config.componentAttrs
          }"
          value-format="yyyy-MM-dd"
          @change="handleChange"
        />
      </div>
      <div v-if="config.type === 'select'">
        <el-select
          v-model="provideData.formInfo[itemKey]"
          v-bind="{
            placeholder: '请选择',
            ...config.componentAttrs
          }"
          @change="handleChange"
        >
          <el-option
            v-for="(item, index) in config.options"
            :key="`${itemKey}_${index}`"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </div>
      <div v-if="config.type === 'radio'">
        <el-radio-group
          v-model="provideData.formInfo[itemKey]"
          v-bind="{
            placeholder: '请选择',
            ...config.componentAttrs
          }"
          @change="handleChange"
        >
          <el-radio
            v-for="(item, index) in config.options"
            :key="`${itemKey}_${index}`"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
      <div v-if="config.type === 'checkbox'">
        <el-checkbox-group v-model="provideData.formInfo[itemKey]">
          <el-checkbox
            v-for="(item, index) in config.options"
            :key="`${itemKey}_${index}`"
            :value="item.value"
            :label="item.value"
          >{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="config.type === 'input' && itemKey">
        <el-input
          v-model="provideData.formInfo[itemKey]"
          v-bind="{
            placeholder: '请填写',
            ...config.componentAttrs
          }"
        >
          <template
            v-if="config.componentAttrs && config.componentAttrs.append"
            slot="append"
          >{{ config.componentAttrs.append }}</template>
        </el-input>
      </div>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    itemKey: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  inject: ['provideData'],
  data() {
    return {
      value1: ''
    }
  },
  computed: {
    rules() {
      if (this.config.rules && typeof this.config.rules === 'object') {
        return this.config.rules
      }
      if (this.config.type === 'radio' || this.config.type === 'select') {
        return {
          message: '请选择',
          trigger: 'change'
        }
      }
      if (this.config.type === 'checkbox') {
        return {
          type: 'array',
          message: '请选择',
          trigger: 'change'
        }
      }
      if (this.config.type === 'date') {
        return {
          message: '请选择',
          trigger: 'change'
        }
      }
      if (this.config.type === 'input') {
        return {
          message: '请填写',
          trigger: 'blur'
        }
      }
      return {}
    },
    display() {
      const relation = this.config.relation
      if (relation && typeof relation.relationFn === 'function') {
        const question = this.provideData.formInfo[relation.questionKey]
        return relation.relationFn(question, relation.expectValue)
      } else {
        if (relation && relation.questionKey) {
          const question = this.provideData.formInfo[relation.questionKey]
          return question === relation.expectValue
        }
      }
      return true
    }
  },
  methods: {
    handleChange(value) {}
  }
}
</script>
