<template>
  <div class="survey-checkbox">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="option in options" :key="option.id" :label="option.id">
        <ContentEditor :value="option.label" class="options-label" />
      </el-checkbox>
    </el-checkbox-group>
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
    return {
      checkList: []
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.survey-checkbox {
  .el-checkbox {
    display: block;
    margin-top: 10px;
  }
  .options-label {
    display: inline-block;
    width: 400px;
  }
}
</style>
