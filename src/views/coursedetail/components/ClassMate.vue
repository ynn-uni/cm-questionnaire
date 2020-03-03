<template>
  <div class="list flex">
    <el-row :gutter="100">
      <el-col v-for="(item,index) in 10" :key="index" :lg="4" :md="6" :xs="8">
        <div class="classmate flex align-center">
          <img src="" alt="">
          name
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'ClassMate',
  props: {},
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.list{
  flex-wrap: wrap;

  .classmate{
    font-size: 16px;
    color: $textPrimary;
    margin-top: 30px;
    width: 230px;
    img{
      display: inline-block;
      width:48px;
      height:48px;
      background:rgba(30,135,240,0.1);
      border:2px solid rgba(19,127,157,1);
      border-radius: 50%;
      margin-right: 30px;
    }
  }
}

</style>
