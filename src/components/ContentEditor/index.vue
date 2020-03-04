<template>
  <div class="content-editor">
    <el-input
      v-model.trim="tempValue"
      :placeholder="placeholder"
      size="small"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempValue: ''
    }
  },
  mounted() {
    this.tempValue = this.value
  },
  methods: {
    handleChange() {
      if (this.tempValue) {
        this.$emit('input', this.tempValue)
      } else {
        // hack, 当空值时，使用原有值
        this.tempValue = this.value
        this.$emit('input', this.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-editor::v-deep {
  & + .content-editor {
    margin-top: 20px;
  }
  .el-input__inner {
    border: 1px solid transparent;
    &:hover {
      border: 1px solid #c0c4cc;
    }
    &:focus {
      border: 1px solid $--color-primary;
    }
  }
}
</style>
