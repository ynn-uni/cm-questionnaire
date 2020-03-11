<template>
  <div class="app-container analysis">
    <div class="title">
      统计分析
    </div>
    <div class="list">
      <el-row :gutter="20">
        <el-col :lg="6" :md="8" :xs="12">
          <div class="item flex">
            <div class="left">
              <i class="iconfont icon-kecheng" />
              <div class="text">我的课程</div>
            </div>
            <div class="right">
              <div class="in-item flex">
                <div class="ti">总计：</div>
                <div class="val">{{ course.total }}门</div>
              </div>
              <div class="in-item flex">
                <div class="ti">进行中：</div>
                <div class="val">{{ course.ongoing }}门</div>
              </div>
              <div class="in-item flex">
                <div class="ti">已完成：</div>
                <div class="val">{{ course.complete }}门</div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :lg="6" :md="8" :xs="12">
          <div class="item flex">
            <div class="left">
              <i class="iconfont icon-wenjuan" />
              <div class="text">我的问卷</div>
            </div>
            <div class="right">
              <div class="in-item flex">
                <div class="ti">总计：</div>
                <div class="val">{{ question.total }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">进行中：</div>
                <div class="val">{{ question.ongoing }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">已完成：</div>
                <div class="val">{{ question.complete }}份</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="8" :xs="12">
          <div class="item flex">
            <div class="left">
              <i class="iconfont icon-fenxiang" />
              <div class="text">转发问卷</div>
            </div>
            <div class="right">
              <div class="in-item flex">
                <div class="ti">总计：</div>
                <div class="val">{{ share.total }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">进行中：</div>
                <div class="val">{{ share.ongoing }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">已完成：</div>
                <div class="val">{{ share.complete }}份</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="8" :xs="12">
          <div class="item flex">
            <div class="left">
              <i class="el-icon-user-solid" />
              <div class="text">调研人数</div>
            </div>
            <div class="right">
              <div class="in-item flex">
                <div class="ti">总计：</div>
                <div class="val">{{ anwser.total }}人</div>
              </div>
              <div class="in-item flex">
                <div class="ti">自发问卷：</div>
                <div class="val">{{ anwser.owner }}人</div>
              </div>
              <div class="in-item flex">
                <div class="ti">转发问卷：</div>
                <div class="val">{{ anwser.share }}人</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="title flex justify-between">
      问卷量
      <el-date-picker
        v-model="date"
        type="month"
        format="yyyy-MM"
        value-format="yyyy-MM"
        placeholder="选择月"
      />
    </div>
    <div class="charts">
      <el-row :gutter="20">
        <el-col :lg="10">
          <VeLine
            :data="chartDataLine"
          />
        </el-col>
        <el-col :lg="10">
          <VePie
            :data="chartDataPie"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import { getUserCensus } from '@/api/analysis'
export default {
  components: {
    VeLine,
    VePie
  },

  data() {
    return {
      course: {},
      question: {},
      share: {},
      anwser: {},
      date: '',
      chartDataLine: {
        columns: ['日期', '问卷一', '问卷二', '问卷三'],
        rows: [
          { '日期': '3.1', '问卷一': 1393, '问卷二': 1093, '问卷三': 500 },
          { '日期': '3.2', '问卷一': 3530, '问卷二': 3230, '问卷三': 689 },
          { '日期': '3.3', '问卷一': 2923, '问卷二': 2623, '问卷三': 1895 },
          { '日期': '3.4', '问卷一': 1723, '问卷二': 1423, '问卷三': 789 },
          { '日期': '3.5', '问卷一': 3792, '问卷二': 3492, '问卷三': 2011 },
          { '日期': '3.6', '问卷一': 4593, '问卷二': 4293, '问卷三': 1203 }
        ]
      },
      chartDataPie: {
        columns: ['问卷名称', '访问用户'],
        rows: [
          { '问卷名称': '问卷1', '访问用户': 1393 },
          { '问卷名称': '问卷2', '访问用户': 3530 },
          { '问卷名称': '问卷3', '访问用户': 2923 },
          { '问卷名称': '问卷4', '访问用户': 1723 },
          { '问卷名称': '问卷5', '访问用户': 3792 },
          { '问卷名称': '问卷6', '访问用户': 4593 }
        ]
      }
    }
  },
  watch: {
    date() {
      console.log(this.date)
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getUserCensus().then((res) => {
        this.course = res.courses
        this.question = res.questionnaires
        this.share = res.shares
        this.anwser = res.anwsers
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.analysis{
  .title{
    font-size: 18px;
    color: $textPrimary;
    margin-bottom: 30px;
    }
    .list{
      .item{
        box-shadow:2px 2px 8px 2px rgba(217,224,227,0.5);
        border-radius:5px;
        width: 100%;
        height: 120px;
        padding: 20px;
        margin-bottom: 30px;

        .left{
          display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        i{
          font-size: 50px;
          color: $primaryColor;
        }
        .text{
          font-size: 16px;
          color: $textPrimary;
        }
        }
        .right{
        margin-left: 30px;
        line-height: 24px;
        .in-item{
          .ti{
            font-size: 14px;
            color: $textSecondary;
            }
            .val{
              font-size: 16px;
              color: $textPrimary;
              }
        }
        }
        }
        }
}
</style>
