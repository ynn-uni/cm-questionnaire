<template>
  <div class="selectgroup flex align-center" />
</template>

<script>
export default {
  name: 'SelectGroup',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      options1: [
        {
          value: '选项3',
          label: '蚵仔煎'
        }
      ],
      options2: [
        {
          value: '选项4',
          label: '龙须面'
        }
      ],
      options3: [
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  methods: {
    handelAddCourse() {
      this.$router.push('analysis')
    }
  }
}
</script>

<style lang="scss" scoped>
.selectgroup {
  // padding: 20px 0;
  flex-wrap: wrap;
  .el-select {
    width: 10%;
    margin-right: 80px;
    @include response-selectGroup();
  }
  // .el-input{
  //   width:200px;
  //   // @include response-selectGroupInput();
  // }
  .course-add {
    margin-top: 10px;
    margin-bottom: 20px;
    i {
      border: 1px solid currentColor;
    }
  }
}
</style>
