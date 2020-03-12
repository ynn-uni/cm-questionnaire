<template>
  <div class="item flex align-center item">
    <div class="top flex align-center">
      <i class="iconfont icon-wenjuan my-icon" />
      <el-link class="title" @click.stop="previewDetail">{{ detail.title }}</el-link>
      <el-link
        v-if="deletable"
        class="delete-button"
        icon="el-icon-delete"
        :underline="false"
        @click="handleDelete"
      >删除</el-link>
    </div>
    <div class="status flex align-center justify-between">
      <el-tag v-if="detail.status === 1" type="success" effect="dark">进行中</el-tag>
      <el-tag v-if="detail.status === 0" type="danger" effect="dark">已结束</el-tag>
      <div v-if="actionable">
        <el-link
          v-if="detail.share === 0 && role !== 2"
          type="primary"
          :underline="false"
          @click.stop.prevent="shareSurvey"
        >
          <i class="iconfont icon-fenxiang share-icon" />分享问卷
        </el-link>
        <div v-else>
          <el-link v-if="detail.status === 1" type="primary" :underline="false" @click.stop.prevent="shareLink">复制链接</el-link>
          <el-link type="primary" :underline="false" @click.stop.prevent="viewResult">查看结果</el-link>
        </div>
      </div>
    </div>
    <div class="fromcourse flex align-center justify-between">
      <div class="course">课程：《{{ detail.ctitle }}》</div>
      <div v-if="!detail.start || !detail.end">不限时</div>
      <div v-else class="date">{{ detail.start }}&nbsp;至&nbsp;{{ detail.end }}</div>
    </div>

    <el-dialog title="问卷链接及二维码" :visible.sync="dialogVisible" width="30%">
      <div class="survey-link flex">
        <canvas id="qrcode" ref="qrcode" class="qrcode" />
        <div class="survey-link-right">
          <el-input :value="surveyUrl" disabled>
            <el-button slot="append" v-clipboard:copy="surveyUrl" v-clipboard:success="onCopy">复制</el-button>
          </el-input>
          <div class="survey-link-button">
            <el-button class="download" @click="downloadQRCode">下载二维码</el-button>
            <el-button class="download">
              <a :href="surveyUrl" target="_blank">打开链接</a>
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { shareSurvey } from '@/api/survey'
import QRCode from 'qrcode'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionItem',
  props: {
    detail: {
      type: Object,
      default: () => {}
    },
    deletable: {
      type: Boolean,
      default: false
    },
    actionable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      collect: false
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'role']),
    surveyUrl() {
      const hostname = window.location.hostname
      const port = window.location.port
      const params = btoa(`id=${this.detail.id}&uid=${this.userInfo.id}`)
      if (process.env.NODE_ENV === 'development') {
        return `http://${hostname}:${port}/answer/${params}`
      } else {
        return `http://${hostname}/answer/${params}`
      }
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete', this.detail)
    },
    previewDetail() {
      this.$router.push({
        path: '/survey/detail',
        query: {
          id: this.detail.id
        }
      })
    },
    viewResult() {
      this.$router.push({
        path: '/survey/result',
        query: {
          id: this.detail.id
        }
      })
    },
    shareSurvey() {
      shareSurvey({ qid: this.detail.id }).then(res => {
        this.$alert(
          '恭喜您，成功分享该问卷，可在【我的问卷】中查看',
          '分享成功',
          {
            confirmButtonText: '确定',
            type: 'success'
          }
        )
      })
    },
    shareLink() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.genQRCode()
      })
    },
    onCopy(e) {
      this.$message.success('复制成功')
    },
    genQRCode() {
      const node = this.$refs.qrcode
      QRCode.toCanvas(node, this.surveyUrl, function(error) {
        if (error) console.error(error)
        console.log('qrcode success!')
      })
    },
    downloadQRCode() {
      const qrcode = this.$refs.qrcode
      const MIME_TYPE = 'image/png'

      const imgURL = qrcode.toDataURL(MIME_TYPE)

      const dlLink = document.createElement('a')
      dlLink.download = this.detail.title
      dlLink.href = imgURL
      dlLink.dataset.downloadurl = [
        MIME_TYPE,
        dlLink.download,
        dlLink.href
      ].join(':')

      document.body.appendChild(dlLink)
      dlLink.click()
      document.body.removeChild(dlLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #b5b5b5;

  .top {
    position: relative;
    width: 100%;
    height: 100%;
    .title {
      margin-right: 50px;
      @include ellipsis;
    }
    .my-icon {
      color: $primaryColor;
      font-size: 44px;
      margin-right: 20px;
    }
    .delete-button {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      color: $textPrimary;
      cursor: pointer;
    }
  }
  .status {
    width: 100%;
    margin-top: 2px;
    font-size: 14px;
    .el-tag {
      text-align: center;
      width: 70px;
      height: 25px;
      line-height: 25px;
    }
    .share-icon {
      margin-right: 3px;
      vertical-align: -1px;
    }
  }
  .fromcourse {
    width: 100%;
    margin-top: 6px;
    padding-top: 6px;
    font-size: 15px;
    color: $textPrimary;
    border-top: 1px solid rgba(181, 181, 181, 1);
    .course {
      @include ellipsis;
      width: 260px;
    }
    .data {
      width: 156px;
    }
  }
  .survey-link {
    display: flex;

    .qrcode {
      width: 100px;
      height: 100px;
      margin-right: 20px;
      border: 1px solid #efefef;
    }
    .survey-link-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

.item:hover .delete-button {
  display: inline-block;
}
</style>
