<template>
  <div class="survey-checkbox">
    <el-checkbox-group>
      <draggable
        :list="options"
        handle=".el-icon-rank"
        chosen-class="checkbox-ghost"
        @choose="disableTip = true"
        @unchoose="disableTip = false"
      >
        <transition-group>
          <el-checkbox
            v-for="(option, index) in options"
            :key="option.id"
            :label="option.id"
            disabled
          >
            <ContentEditor v-model="option.label" class="option-label" />
            <el-tooltip content="长按拖动" placement="top" effect="light" :disabled="disableTip">
              <i class="option-action el-icon-rank" />
            </el-tooltip>
            <!-- <i class="option-action el-icon-setting" /> -->
            <el-tooltip content="删除" placement="top" effect="light" :disabled="disableTip">
              <i class="option-action el-icon-remove-outline" @click="handleDeleteOption(index)" />
            </el-tooltip>
          </el-checkbox>
        </transition-group>
      </draggable>
    </el-checkbox-group>
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
    handleUpdateList(evt) {
      console.log(evt)
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
  .el-checkbox {
    margin-top: 5px;
    padding: 2px 10px;
  }
  .el-checkbox:hover {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    .option-action {
      display: inline-block;
    }
  }
  .checkbox-ghost {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
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
