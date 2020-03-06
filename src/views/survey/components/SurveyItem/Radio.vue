<template>
  <div class="survey-radio">
    <draggable
      :list="options"
      handle=".el-icon-rank"
      chosen-class="radio-ghost"
      @choose="disableTip = true"
      @unchoose="disableTip = false"
    >
      <transition-group>
        <el-col v-for="(option, index) in options" :key="option.id" :span="24 / column">
          <el-radio :label="option.id" disabled>
            <ContentEditor v-model="option.label" class="option-label" />
            <el-tooltip content="长按拖动" placement="top" effect="light" :disabled="disableTip">
              <i class="option-action el-icon-rank" />
            </el-tooltip>
            <!-- <i class="option-action el-icon-setting" /> -->
            <el-tooltip content="删除" placement="top" effect="light" :disabled="disableTip">
              <i class="option-action el-icon-remove-outline" @click="handleDeleteOption(index)" />
            </el-tooltip>
          </el-radio>
        </el-col>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ContentEditor from '@/components/ContentEditor'
export default {
  name: '',
  components: {
    Draggable,
    ContentEditor
  },
  props: {
    column: {
      type: Number,
      default: 1
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      disableTip: false
    }
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
.survey-radio::v-deep {
  .el-radio-group {
    display: block;
  }
  .el-radio {
    display: block;
    margin-top: 5px;
    padding: 2px 10px;
  }
  .el-radio__label {
    display: inline-block;
    width: 100%;
    padding-right: 80px;
  }
  .option-label {
    display: inline-block;
    width: 400px;
    max-width: 100%;
  }
  .el-radio:hover {
    background: #efefef;
    .option-action {
      display: inline-block;
    }
  }
  .radio-ghost {
    background: #efefef;
    background-color: #fff;
  }
  .option-action {
    display: none;
    color: #999;
    margin-left: 10px;
    margin-right: 10px;
    line-height: 32px;
    &:hover {
      cursor: pointer;
      color: $--color-primary;
    }
  }
}
</style>
