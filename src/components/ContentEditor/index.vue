<template>
  <div class="content-editor">
    <el-input
      v-if="!richtext"
      v-model.trim="tempValue"
      :placeholder="placeholder"
      size="small"
      @change="handleChange"
    />
    <editor
      v-else
      v-model.trim="tempValue"
      :inline="true"
      :init="{
        height: 80,
        menubar: false,
        language: 'zh_CN',
        statusbar: false,
        plugins: plugins,
        toolbar: 'image | openRichtext',
        images_upload_handler: imagesUploadHandler,
        setup: (editor) => {
          editor.ui.registry.addButton('openRichtext', {
            icon: 'format',
            tooltip: '打开编辑器',
            onAction: () => dialogVisible = true
          });
        }
      }"
      @onChange="handleChange"
    />

    <el-dialog title="高级编辑器" :visible.sync="dialogVisible" width="50%">
      <editor
        v-model.trim="tempValue"
        :init="{
          height: 500,
          menubar: false,
          language: 'zh_CN',
          plugins: plugins,
          toolbar: toolbar,
          images_upload_handler: imagesUploadHandler
        }"
        @onChange="handleChange"
      />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRichtextConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'ContentEditor',
  components: { Editor },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    richtext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempValue: '',
      dialogVisible: false,
      imagesUploadUrl: `${process.env.VUE_APP_BASE_API}/Common/uploadImage`
    }
  },
  computed: {
    plugins() {
      return [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ]
    },
    toolbar() {
      return `undo redo | formatselect | bold italic backcolor |
        alignleft aligncenter alignright alignjustify | image imageUpload | embed
        bullist numlist outdent indent | removeformat`
    }
  },
  mounted() {
    this.tempValue = this.value
  },
  methods: {
    handleChange() {
      if (this.tempValue) {
        this.$emit('input', this.tempValue)
      } else {
        // hack, 当空值时，使用原有值
        this.tempValue = this.value
        this.$emit('input', this.value)
      }
    },
    handleRichtextConfirm() {
      this.dialogVisible = false
    },
    imagesUploadHandler(blobInfo, success, failure) {
      const file = blobInfo.blob()

      const xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', this.imagesUploadUrl)

      xhr.onload = function() {
        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status)
          return
        }

        const json = JSON.parse(xhr.responseText).data

        if (!json || typeof json.path !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText)
          return
        }

        success(`${process.env.VUE_APP_STATIC_IMG}/${json.path}`)
      }

      const formData = new FormData()
      formData.append('file', file, file.name)

      xhr.send(formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-editor::v-deep {
  text-align: left;
  & + .content-editor {
    margin-top: 20px;
  }
  .el-input__inner {
    border: 1px solid transparent;
    &:hover {
      border: 1px solid #ebeef5;
    }
    &:focus {
      border: 1px solid $--color-primary;
    }
  }
  p {
    margin: 0;
    line-height: 32px;
  }
}
</style>
<style lang="scss">
.content-editor {
  *[contentEditable='true'] {
    padding: 0 15px;
    border-radius: 4px;
    line-height: 1.5;
    border: 1px solid transparent;
  }
  *[contentEditable='true']:focus {
    border: 1px solid $--color-primary !important;
  }
  *[contentEditable='true']:hover {
    border: 1px solid #ebeef5;
  }
  .el-dialog__wrapper {
    z-index: 1100 !important;
  }
}
.v-modal {
  z-index: 1009 !important;
}

.tox .tox-notification {
  display: none !important;
}
</style>
