<template>
  <div class="survey-checkbox">
    <draggable
      :list="options"
      handle=".el-icon-rank"
      chosen-class="checkbox-ghost"
      @choose="disableTip = true"
      @unchoose="disableTip = false"
    >
      <transition-group>
        <el-col v-for="(option, index) in options" :key="option.id" :span="24 / column">
          <el-checkbox :label="option.id" disabled>
            <ContentEditor
              ref="option"
              v-model="option.label"
              class="option-label"
              placeholder="请填写选项"
              @enter="handleEnter(index)"
            />
            <el-tooltip content="长按拖动" placement="top" effect="light" :disabled="disableTip">
              <i class="option-action el-icon-rank" />
            </el-tooltip>
            <!-- <i class="option-action el-icon-setting" /> -->
            <el-tooltip content="删除" placement="top" effect="light" :disabled="disableTip">
              <i class="option-action el-icon-remove-outline" @click="handleDeleteOption(index)" />
            </el-tooltip>
          </el-checkbox>
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
    },
    handleEnter(index) {
      this.$emit('enter', index)
      this.focusLastOption()
    },
    focusLastOption() {
      // hack 当添加选项时，ref默认添加到数组最后，因此聚焦最后一个
      this.$nextTick(() => {
        const options = this.$refs.option
        const length = options.length
        options[length - 1].focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-checkbox::v-deep {
  .el-checkbox {
    display: block;
    margin-top: 10px;
  }
  .el-checkbox__label {
    width: 100%;
    padding-right: 80px;
  }
  .option-label {
    display: inline-block;
    width: 400px;
    max-width: 100%;
  }
  .el-checkbox {
    margin-top: 0px;
    padding: 2px 10px;
  }
  .el-checkbox:hover {
    background: #efefef;
    .option-action {
      display: inline-block;
    }
  }
  .checkbox-ghost {
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
