<template>
  <div class="survey-radio">
    <el-radio-group>
      <el-radio v-for="option in options" :key="option.id" :label="option.id">
        <ContentEditor :value="option.label" class="options-label" />
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import ContentEditor from '@/components/ContentEditor'
export default {
  name: '',
  components: {
    ContentEditor
  },
  props: {
    options: {
      type: [Array, Object],
      default: () => []
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
.survey-radio {
  .el-radio {
    display: block;
    margin-top: 10px;
  }
  .options-label {
    display: inline-block;
    width: 400px;
  }
}
</style>
