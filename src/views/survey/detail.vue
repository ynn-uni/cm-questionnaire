<template>
  <div class="app-container">
    <h2>{{ survey.title }}</h2>
    <div v-if="survey.tips" class="form-tips">{{ survey.tips }}</div>
    <el-form ref="formInfo" :model="formInfo" label-width="10em" label-position="right">
      <div v-for="(section, key) in survey.sections" :key="key">
        <h3 v-if="section.title" class="section-title">{{ section.title }}</h3>
        <el-row class="survey-section">
          <form-item
            v-for="(item, itemKey) in section.questions"
            :key="itemKey"
            :item-key="itemKey"
            :config="item"
          />
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import FormItem from './components/FormItem/index'
import surveyTable from './data/index'
export default {
  name: 'SurveyDetail',
  provide() {
    return {
      provideData: this
    }
  },
  components: {
    FormItem
  },
  data() {
    return {
      formInfo: {},
      survey: surveyTable
    }
  },
  mounted() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    color: $menuText;
  }
</style>
