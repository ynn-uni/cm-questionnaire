<template>
  <div class="app-container course">
    <div v-permission="1">
      <div class="title-tab flex">
        <div class="tab" :class="status==0?'active':''" @click="activeTab(0)">
          我的课程
        </div>
        <div class="tab" :class="status==1?'active':''" @click="activeTab(1)">
          所有课程
        </div>
      </div>
      <SelectGroup v-if="status==1" />
      <div v-if="status==0" class="courselist">
        <CourseList />
      </div>
      <div v-if="status==1" class="courselist">
        <CourseList />
      </div>

      <div v-if="status==0">
        <div class="title-tab">
          推荐课程
        </div>
        <div class="courselist">
          <CourseList />
        </div>
      </div>
    </div>
    <div v-permission="2">
      <div class="title-tab flex">
        我的课程
      </div>
      <SelectGroup />
      <CourseList />
    </div>
  </div>
</template>

<script>
import CourseList from '@/components/CourseList'
import SelectGroup from '@/components/SelectGroup'
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
    font-size: 20px;
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
