<template>
  <div class="list flex">
    <el-row v-if="newstudents.length>0" :gutter="100">
      <el-col v-for="(item,index) in newstudents" :key="index" :lg="4" :md="6" :xs="8">
        <div class="classmate flex align-center">
          <img :src="item.user.mobile">
          {{ item.user.truename }}
        </div>
      </el-col>
    </el-row>
    <NoData v-else :text="'暂无学生加入'" />
  </div>

</template>

<script>
import Identicon from 'identicon.js'
import NoData from '@/components/NoData'
export default {
  name: 'ClassMate',
  components: {
    NoData
  },
  props: {
    students: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  computed: {
    newstudents() {
      if (this.students.length > 0) {
        for (var i = 0; i < this.students.length; i++) {
          var { mobile } = this.students[i].user
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.students[i].user.mobile = 'data:image/png;base64,' + new Identicon('user' + mobile, 420)
        }
        return this.students
      }
      return []
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.list{
  flex-wrap: wrap;

  .classmate{
    font-size: 16px;
    color: $textPrimary;
    margin-top: 30px;
    width: 230px;
    img{
      display: inline-block;
      width:48px;
      height:48px;
      background:rgba(30,135,240,0.1);
      // border:2px solid rgba(19,127,157,1);
      border-radius: 50%;
      // margin-right: 30px;
    }
  }
}

</style>
