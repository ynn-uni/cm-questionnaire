<template>
  <div class="survey-input">
    <el-input :placeholder="placeholder" disabled size="small" />
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.survey-input {
  .el-input {
    display: block;
    margin-top: 10px;
    width: 400px;
  }
  .options-label {
    display: inline-block;
    width: 400px;
  }
}
</style>
