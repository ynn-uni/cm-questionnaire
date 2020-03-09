<template>
  <div class="course flex justify-between">
    <el-row v-if="courselist.length>0" :gutter="20">
      <CourseItem v-for="(item,index) in courselist" :key="index" :info="item" />
    </el-row>
    <div v-else class="nodata">
      暂无数据
    </div>
  </div>
</template>

<script>
import CourseItem from '@/components/CourseItem'
import { mapGetters } from 'vuex'
export default {
  name: 'CourseList',
  components: {
    CourseItem
  },
  props: {
    courselist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // courseList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {

  },

  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .course{
    margin-top: 30px;
    flex-wrap: wrap;
    width: 100%;
    .el-row{
      width: 100%;
    }
    .nodata{
      font-size: 16px;
      color: $textPrimary;
      text-align: center;
      width: 100%;
    }
  }
</style>
