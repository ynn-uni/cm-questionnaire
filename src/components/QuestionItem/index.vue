<template>
  <div class="item flex align-center item">
    <div class="top flex align-center">
      <i class="iconfont icon-wenjuan my-icon" />
      <el-link @click.stop="viewDetail">{{ detail.title }}</el-link>
    </div>
    <div class="status flex align-center justify-between">
      <el-tag v-if="detail.status === 1" type="success" effect="dark">进行中</el-tag>
      <el-tag v-if="detail.status === 0" type="danger" effect="dark">已结束</el-tag>
      <el-link
        v-if="detail.share === 0"
        type="primary"
        :underline="false"
        @click.stop.prevent="shareSurvey"
      >
        <i class="iconfont icon-fenxiang share-icon" />分享问卷
      </el-link>
      <el-link v-else type="primary" :underline="false" @click.stop.prevent="shareLink">复制链接</el-link>
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
            <el-link class="download" :underline="false" @click="downloadQRCode">下载二维码</el-link>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { shareSurvey } from '@/api/survey'
import QRCode from 'qrcode'
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
    }
  },
  data() {
    return {
      dialogVisible: false,
      collect: false
    }
  },
  computed: {
    surveyUrl() {
      const hostname = window.location.hostname
      const port = window.location.port
      return `http://${hostname}:${port}/#/survey/detail?id=${this.detail.id}`
    }
  },
  methods: {
    viewDetail() {
      this.$router.push({
        path: '/survey/detail',
        query: {
          id: this.detail.id
        }
      })
    },
    shareSurvey() {
      shareSurvey({ qid: this.detail.id }).then(res => {
        this.$message.success()
        console.log(res)
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
    width: 100%;
    height: 100%;
    .my-icon {
      color: $primaryColor;
      font-size: 44px;
      margin-right: 20px;
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

    .survey-link-button {
      padding-bottom: 10px;
    }
  }
}
</style>
