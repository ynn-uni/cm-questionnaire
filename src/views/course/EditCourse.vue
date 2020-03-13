<template>
  <div class="addcourse app-container">
    <div class="title">
      编辑课程
    </div>
    <div class="content">
      <el-form ref="sizeForm" :rules="rules" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="课程名称" prop="title">
          <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="课时" prop="hour">
          <el-input v-model="sizeForm.hour" type="number" min="0" />
        </el-form-item>
        <el-form-item label="学分" prop="credit">
          <el-input v-model="sizeForm.credit" type="number" min="0" />
        </el-form-item>
        <el-form-item label="考核方式" prop="check">
          <el-input v-model="sizeForm.check" />
        </el-form-item>
        <el-form-item label="课程状态" prop="status">
          <el-select v-model="sizeForm.status" placeholder="">
            <el-option label="进行中" :value="1" />
            <el-option label="已结束" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item prop="cover" label-width="0px" class="uplode">
          <div class="uplodeinner">
            <upload v-model="sizeForm.cover" @input="getImgPath" />
          </div>
        </el-form-item>
        <el-form-item label="课程简介" prop="describe">
          <el-input v-model="sizeForm.describe" type="textarea" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="handelEditCourse('sizeForm')">提交</el-button>
          <el-button @click="resetForm(sizeForm)">重置</el-button>
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

  },
  data() {
    return {
      status: null,
      sizeForm: {
        title: '',
        cover: '',
        hour: '',
        check: '',
        credit: '',
        describe: '',
        status: 1,
        sort: 1
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        hour: [
          { required: true, message: '请输入课时', trigger: 'blur' }
        ],
        check: [
          { required: true, message: '请输入考核方式', trigger: 'blur' }
        ],
        credit: [
          { required: true, message: '请输入学分', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入课程相关描述', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择课程状态', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    getCourseDetails({ id: this.$route.query.id }).then((res) => {
      this.sizeForm = res
    })
  },
  methods: {
    handelEditCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editCourse(this.sizeForm).then((res) => {
            this.$message.success('修改成功')
            setTimeout(() => {
              this.$router.push('/course')
            }, 300)
          })
        } else {
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
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
      border: 1px solid #d8d8d8;
      width: 220px;
    }
    .uplode{
      position: absolute;
      top: 30px;
      right: 200px;
      .uplodeinner{
        width: 178px;
        height: 178px;
        border: 1px dashed $textSecondary;
        border-radius: 5px;
      }
    }

  }
}

</style>
