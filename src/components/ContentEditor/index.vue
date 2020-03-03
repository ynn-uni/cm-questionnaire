<template>
  <div class="content-editor">
    <el-input :value="value" :placeholder="placeholder" size="small" @input="handleChange" />
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
    return {}
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit('input', value)
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
