<template>
  <div class="survey-radio">
    <el-radio-group>
      <draggable v-model="options" handle=".el-icon-rank">
        <transition-group>
          <el-radio v-for="(option, index) in options" :key="option.id" :label="option.id" disabled>
            <ContentEditor v-model="option.label" class="option-label" />
            <i class="option-action el-icon-rank" />
            <!-- <i class="option-action el-icon-setting" /> -->
            <i class="option-action el-icon-remove-outline" @click="handleDeleteOption(index)" />
          </el-radio>
        </transition-group>
      </draggable>
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
.survey-radio {
  .el-radio-group {
    display: block;
  }
  .el-radio {
    display: block;
    margin-top: 10px;
  }
  .option-label {
    display: inline-block;
    width: 400px;
  }
  .el-radio:hover {
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
