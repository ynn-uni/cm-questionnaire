<template>
  <div class="empty">
    <div class="empty-icon">
      <i class="el-icon-receiving" :style="{fontSize: size + 'px'}" />
    </div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: $textSecondary;
  line-height: 20px;
  margin: 30px 0;
  .empty-icon {
    text-align: center;
    line-height: 2;
  }
}
</style>
