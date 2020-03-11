<template>
  <div class="addcourse app-container">
    <div class="title">
      编辑课程
    </div>
    <div class="content">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="课程名称">
          <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="课时">
          <el-input v-model="sizeForm.hour" type="number" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="sizeForm.credit" type="number" />
        </el-form-item>
        <el-form-item label="考核方式">
          <el-input v-model="sizeForm.check" />
        </el-form-item>
        <el-form-item label="课程状态">
          <el-select v-model="status" placeholder="">
            <el-option label="进行中" value="1" />
            <el-option label="已结束" value="2" />
          </el-select>
        </el-form-item>
        <div class="uplode">
          <upload v-model="sizeForm.cover" @input="getImgPath" />
        </div>
        <el-form-item label="课程简介" prop="desc">
          <el-input v-model="sizeForm.describe" type="textarea" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="handelEditCourse">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import upload from '@/components/Upload/UploadImage'
import { editCourse, getCourseDetails } from '@/api/course'
export default {
  name: 'SelectGroup',
  components: {
    upload
  },
  props: {
    upload
  },
  data() {
    return {
      sizeForm: {},
      status: null

    }
  },
  mounted() {
    getCourseDetails({ id: this.$route.query.id }).then((res) => {
      this.sizeForm = res
      this.status = this.sizeForm.status === 1 ? '进行中' : '已结束'
    })
  },
  methods: {
    handelEditCourse() {
      this.sizeForm.status = this.status === '进行中' ? 1 : this.status === '已结束' ? 2 : ''
      editCourse(this.sizeForm).then((res) => {
        this.$message.success('修改成功')
      })
    },
    getImgPath(path) {
      this.sizeForm.cover = path
    }
  }
}
</script>

<style lang="scss" scoped>
.addcourse::v-deep{
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
    position: relative;
    .el-input__inner{
      font-size: 16px;
      color: $textSecondary;
    }
    .el-textarea__inner{
      width: 580px;
      height: 300px;
    }
     .el-input__inner{
      // border:none;
      // border-radius: 0px;
      border: 1px solid #d8d8d8;
      width: 220px;
    }
     .uplode{
      position: absolute;
      top: 30px;
      right: 200px;
      width: 178px;
      height: 178px;
      border: 1px dashed $textSecondary;
      border-radius: 5px;
    }
  }
}

</style>
