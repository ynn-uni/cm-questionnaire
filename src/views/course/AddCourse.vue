<template>
  <div class="addcourse app-container">
    <div class="title">
      新增课程
    </div>
    <div class="content">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="课程名称">
          <el-input v-model="sizeForm.title" />
        </el-form-item>
        <el-form-item label="课时">
          <el-input v-model="sizeForm.hour" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="sizeForm.credit" />
        </el-form-item>
        <el-form-item label="考核方式">
          <el-input v-model="sizeForm.check" />
        </el-form-item>
        <el-form-item label="课程状态">
          <el-select v-model="sizeForm.status" placeholder="">
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
          <el-button type="primary" @click="handelAddCourse">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import upload from '@/components/Upload/UploadImage'
import { addCourse } from '@/api/course'
export default {
  name: 'SelectGroup',
  components: {
    upload
  },
  props: {

  },
  data() {
    return {
      sizeForm: {
        title: 'test',
        cover: '',
        hour: '40',
        check: '考核+笔试',
        credit: '4',
        describe: 'test',
        status: '1',
        sort: '1'
      }

    }
  },
  mounted() {
    console.log(this.BASE_URL)
  },
  methods: {
    handelAddCourse() {
      if (this.sizeForm.courseName && this.sizeForm.courseTimer && this.sizeForm.courseSource && this.sizeForm.courseType && this.sizeForm.courseStartTime && this.sizeForm.courseEndTime && this.sizeForm.courseDis && this.sizeForm.cover) {
        addCourse(this.sizeForm).then(() => {
          this.$message.success('添加成功')
        })
      } else {
        this.$message.error('请输入完整的课程信息')
      }
    },
    getImgPath(path) {
      this.sizeForm.cover = path
    }
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
    position: relative;
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
    .uplode{
      position: absolute;
      top: 30px;
      right: 200px;
    }

  }
}

</style>
