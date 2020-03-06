<template>
  <div class="app-container course">
    <div v-if="userInfo.type==2" v-permission="2">
      <div class="title-tab flex justify-between">
        我的课程
        <SelectGroup />
      </div>

      <CourseList :type="'my'" />
    </div>
    <div v-if="userInfo.type==1" v-permission="1">
      <div class=" flex justify-between">
        <div class="title-tab flex">
          <div class="tab" :class="status==0?'active':''" @click="activeTab(0)">
            我的课程
          </div>
          <div class="tab" :class="status==1?'active':''" @click="activeTab(1)">
            所有课程
          </div>
        </div>
        <SelectGroup v-if="status==1" />
      </div>

      <CourseList v-if="status==0" :type="'my'" />

      <CourseList v-if="status==1" :type="'all'" />

      <!-- <div v-if="status==0">
        <div class="title-tab">
          推荐课程
        </div>
        <div class="courselist">
          <CourseList :type="'recommend'" />
        </div>
      </div> -->
    </div>

  </div>
</template>

<script>
import CourseList from '@/components/CourseList'
import SelectGroup from '@/components/SelectGroup'
import { mapGetters } from 'vuex'
export default {
  components: {
    CourseList,
    SelectGroup
  },

  data() {
    return {
      status: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    activeTab(status) {
      this.status = status
    }
  }
}
</script>
<style lang="scss" scoped>
.course{
  .title-tab{
    font-size: 18px;
    color: $textPrimary;
    .tab{
      margin-right: 100px;
      padding-bottom: 10px;
      cursor: pointer;
    }
    .active{
      border-bottom: 4px solid $primaryColor;
    }

  }
}
</style>
