<template>
  <div class="selectgroup flex align-center">
    <!-- <el-select v-model="value" placeholder="授课老师">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="value" placeholder="课时">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="value" placeholder="考核方式">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="value" placeholder="学分">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
    <el-input
      v-model="value"
      placeholder="请输入课程名称"
      suffix-icon="el-icon-search"
    />
    <div v-permission="2" class="add flex" @click="handelAddCourse">
      <i class="iconfont icon-tj" />
      添加课程
    </div>
  </div>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      options1: [{
        value: '选项3',
        label: '蚵仔煎'
      }],
      options2: [{
        value: '选项4',
        label: '龙须面'
      }],
      options3: [{
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    handelAddCourse() {
      this.$router.push('/course/addcourse')
    }
  }
}
</script>

<style lang="scss" scoped>
  .selectgroup{
    // padding: 20px 0;
    // flex-wrap: wrap;
    // .el-select{
    //   width: 10%;
    //   margin-right: 80px;
    //   @include response-selectGroup();
    // }
    .el-input{
      width:200px;
      // @include response-selectGroupInput();
    }
    .add{
      font-size: 16px;
      color: $primaryColor;
      cursor: pointer;
      i{
        margin-left: 80px;
        margin-right: 4px;
        line-height: 16px;
        font-size: 12px;
        display: block;
        color: $primaryColor;
        border: 1px solid $primaryColor;
      }
    }
  }
</style>
