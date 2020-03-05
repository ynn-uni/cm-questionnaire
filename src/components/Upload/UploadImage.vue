<template>
  <div class="upload-image">
    <el-upload
      list-type="picture-card"
      name="image"
      :headers="headers"
      :multiple="false"
      :limit="limit"
      :action="actionUrl"
      :before-upload="onBeforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :file-list="fileList"
    >
      <div>
        <i class="el-icon-plus" />
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false" class="padding-60-b">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    beforeUpload: {
      type: Function,
      default: () => {}
    },
    limit: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: {
        token: 'Bearer ' + this.$store.getters.token
      },
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      actionUrl: `${process.env.VUE_APP_BASE_API}/Common/uploadImage`
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  mounted() {
    if (this.value) {
      this.fileList.push({
        url: `${process.env.VUE_APP_BASE_API}${this.value}`
      })
    }
  },
  methods: {
    handleSuccess(response, file) {
      let path = ''
      if (response.status === 200) {
        path = response.data.path
      }
      this.emitInput(path)
    },
    handleRemove() {
      this.emitInput('')
      this.fileList = []
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed() {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件`)
    },
    onBeforeUpload() {
      this.beforeUpload && this.beforeUpload()
    }
  }
}
</script>
