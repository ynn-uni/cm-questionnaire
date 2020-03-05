<template>
  <div class="survey-checkbox">
    <el-checkbox-group>
      <el-checkbox v-for="(option, index) in options" :key="option.id" :label="option.id" disabled>
        <ContentEditor v-model="option.label" class="option-label" />
        <!-- <i class="option-action el-icon-setting" /> -->
        <i class="option-action el-icon-remove-outline" @click="handleDeleteOption(index)" />
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
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleDeleteOption(evt) {
      // hack，操作prop的options
      this.options.splice(evt, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-checkbox {
  .el-checkbox {
    display: block;
    margin-top: 10px;
  }
  .option-label {
    display: inline-block;
    width: 400px;
  }
  .el-checkbox:hover {
    .option-action {
      display: inline-block;
    }
  }
  .option-action {
    display: none;
    color: #999;
    margin-right: 10px;
     line-height: 32px;
    &:hover {
      cursor: pointer;
      color: $--color-primary;
    }
  }
}
</style>
