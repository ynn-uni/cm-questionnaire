<template>
  <div class="upload-image">
    <el-upload
      name="image"
      class="avatar-uploader"
      :action="actionUrl"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="onBeforeUpload"
    >
      <img v-if="dialogVisible" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      imageUrl: null,
      dialogVisible: false,
      actionUrl: `${process.env.VUE_APP_BASE_API}/Common/uploadImage`
    }
  },

  mounted() {
    setTimeout(() => {
      if (this.value) {
        this.dialogVisible = true
        this.imageUrl = process.env.VUE_APP_STATIC_IMG + this.value
      }
    }, 1000)
  },
  methods: {
    handleSuccess(response, file) {
      let path = ''
      if (response.status === 200) {
        path = response.data.path
        this.handlePictureCardPreview(path)
      }
      this.emitInput(path)
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handlePictureCardPreview(path) {
      this.imageUrl = process.env.VUE_APP_STATIC_IMG + path
      this.dialogVisible = true
    },
    onBeforeUpload() {
      this.beforeUpload && this.beforeUpload()
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-image::v-deep{

    width: 100%;
    height: 100%;
    overflow: hidden;
    .avatar-uploader{
      width: 100%;
      height: 100%;
      .el-upload {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;;
        }
      .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;

        text-align: center;
      }
      .avatar {
        width: 100%;
        height: 100%;
        display: block;
      }
  }
}

  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }

</style>
