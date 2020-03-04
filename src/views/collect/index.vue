<template>
  <div class="app-container course">
    <div class="title-tab flex">
      <div class="tab" :class="status==0?'active':''" @click="activeTab(0)">
        收藏课程
      </div>
      <div class="tab" :class="status==1?'active':''" @click="activeTab(1)">
        收藏问卷
      </div>
    </div>
    <SelectGroup />
    <div v-if="status==0" class="courselist">
      <CourseList />
    </div>
    <div v-if="status==1" class="courselist">
      <QuestionList />
    </div>

  </div>
</template>

<script>
import CourseList from '@/components/CourseList'
import QuestionList from '@/components/QuestionList'
import SelectGroup from '@/components/SelectGroup'
export default {
  components: {
    CourseList,
    QuestionList,
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
