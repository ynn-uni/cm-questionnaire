<template>
  <div class="addcourse app-container">
    <div class="title">
      新增课程
    </div>
    <div class="content">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="课程名称">
          <el-input v-model="sizeForm.name" />
        </el-form-item>
        <el-form-item label="课时">
          <el-input v-model="sizeForm.name" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="sizeForm.name" />
        </el-form-item>
        <el-form-item label="考核方式">
          <el-input v-model="sizeForm.name" />
        </el-form-item>

        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker v-model="sizeForm.date1" type="date" placeholder="开始时间" style="width: 100%;" />
          </el-col>
          <el-col :span="11">
            <el-date-picker v-model="sizeForm.date1" type="date" placeholder="结束时间" style="width: 100%;" />
          </el-col>

        </el-form-item>
        <el-form-item label="课程简介" prop="desc">
          <el-input v-model="sizeForm.date1" type="textarea" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectGroup',
  props: {

  },
  data() {
    return {
      sizeForm: {
        name: '',
        region: ''
      }

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.addcourse{
  .title{
      font-size: 20px;
      color: $textPrimary;
  }
  .content{
    margin-top: 30px;
    padding-top: 30px;
    padding-left: 80px;
    width:943px;
    height:713px;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 16px 0px rgba(217,217,217,0.5);
    border-radius:9px;
    border:1px solid rgba(229,229,229,1);
    /deep/.el-input__inner{
      font-size: 16px;
      color: $textSecondary;
    }
    /deep/.el-textarea__inner{
      width: 580px;
      height: 300px;
    }
     /deep/.el-input__inner{
      // border:none;
      // border-radius: 0px;
      border: 1px solid #d8d8d8;
      width: 220px;
    }

  }
}

</style>
