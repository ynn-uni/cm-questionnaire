<template>
  <div class="statisticalanalysis flex justify-between">
    <el-row :gutter="20">
      <el-col :lg="4" :md="8" :xs="12">
        <div class="item flex">
          <div class="left">..</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserCensus } from '@/api/analysis'
export default {
  name: 'StatisticAlanalysis',
  components: {

  },
  props: {

  },
  data() {
    return {
      course: {},
      question: {},
      share: {}

    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getUserCensus().then(() => {

      })
    }
  }
}
</script>

<style scoped lang="scss">
  .statisticalanalysis{
    .item{
      height:121px;
      background:rgba(255,255,255,1);
      box-shadow:2px 2px 8px 2px rgba(217,224,227,0.5);
      border-radius:5px;
    }
  }
</style>
