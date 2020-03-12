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
                <div class="val">{{ course.total || 0 }}门</div>
              </div>
              <div class="in-item flex">
                <div class="ti">进行中：</div>
                <div class="val">{{ course.ongoing || 0 }}门</div>
              </div>
              <div class="in-item flex">
                <div class="ti">已完成：</div>
                <div class="val">{{ course.complete || 0 }}门</div>
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
                <div class="val">{{ question.total || 0 }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">进行中：</div>
                <div class="val">{{ question.ongoing || 0 }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">已完成：</div>
                <div class="val">{{ question.complete || 0 }}份</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="8" :xs="12">
          <div class="item flex">
            <div class="left">
              <i class="iconfont icon-fenxiang" />
              <div v-permission="1" class="text">转发问卷</div>
              <div v-permission="2" class="text">学生转发</div>
            </div>
            <div class="right">
              <div class="in-item flex">
                <div class="ti">总计：</div>
                <div class="val">{{ share.total || 0 }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">进行中：</div>
                <div class="val">{{ share.ongoing || 0 }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">已完成：</div>
                <div class="val">{{ share.complete || 0 }}份</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="8" :xs="12">
          <div class="item flex">
            <div class="left">
              <i class="el-icon-user-solid" />
              <div class="text">问卷结果</div>
            </div>
            <div class="right">
              <div class="in-item flex">
                <div class="ti">总计：</div>
                <div class="val">{{ anwser.total || 0 }}份</div>
              </div>
              <div class="in-item flex">
                <div class="ti">自发问卷：</div>
                <div class="val">{{ anwser.owner || 0 }}份</div>
              </div>
              <div class="in-item flex">
                <div v-permission="1" class="ti">转发问卷：</div>
                <div v-permission="2" class="ti">被转问卷：</div>
                <div class="val">{{ anwser.share || 0 }}份</div>
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
        @change="changeDate"
      />
    </div>
    <div class="charts">
      <el-row>
        <el-col :lg="12">
          <div class="title charttitle flex justify-center">
            问卷曲线统计图

          </div>
          <VeLine
            :legend-visible="false"
            :data="chartDataLine"
          />
        </el-col>
        <el-col :lg="12">
          <div class="title charttitle flex justify-center">
            问卷扇形统计图

          </div>
          <VePie
            v-if="chartDataPie.rows.length>0"
            :settings="chartSettings"
            :legend-visible="false"
            :data="chartDataPie"
          />
          <NoData v-else :text="'本月无问卷统计数据'" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import NoData from '@/components/NoData'
import { getUserCensus, getAnswerCakeCensus, getAnswerLineCensus } from '@/api/analysis'
export default {
  components: {
    VeLine,
    VePie,
    NoData
  },

  data() {
    this.chartSettings = {
      label: {
        show: false
      }
    }

    return {
      course: {},
      question: {},
      share: {},
      anwser: {},
      date: '',
      chartDataLine: {
        columns: ['日期',
          '问卷一',
          '问卷二',
          '问卷三'],
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
        rows: []
      }
    }
  },

  mounted() {
    this.getAnalysisData()
    this.getMonth()
  },
  methods: {
    getPieData(month) {
      getAnswerCakeCensus({ month }).then((res) => {
        this.chartDataPie.rows = []
        res.forEach(val => {
          this.chartDataPie.rows.push({ '问卷名称': val.title, '访问用户': val.count })
        })
      })
    },
    getLineData(month) {
      getAnswerLineCensus({ month }).then((res) => {
        this.chartDataLine.columns = ['日期']
        this.chartDataLine.rows = []
        var count = 1
        for (var i in res) {
          var row = { '日期': i.split('-')[1] + '.' + i.split('-')[2] }
          res[i].forEach(val => {
            if (count === 1) {
              this.chartDataLine.columns.push(val.title)
            }
            if (val.title) {
              row[val.title] = val.total
            }
          })
          count++
          this.chartDataLine.rows.push(row)
        }
      })
    },
    changeDate() {
      this.getPieData(this.date)
      this.getLineData(this.date)
    },
    getAnalysisData() {
      getUserCensus().then((res) => {
        this.course = res.courses
        this.question = res.questionnaires
        this.share = res.shares
        this.anwser = res.anwsers
      })
    },
    getMonth() {
      var day1 = new Date()
      var year = day1.getFullYear()
      var month = day1.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      this.date = year + '-' + month
      this.getPieData(this.date)
      this.getLineData(this.date)
    }
  }
}
</script>
<style lang="scss" scoped>
  .analysis{
    .title{
        font-size: 18px;
        color: $textPrimary;
      }
    .list{
      margin-top: 30px;
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
    .charttitle{
      font-size: 14px;
      color: $textSecondary;
    }
  }
</style>
