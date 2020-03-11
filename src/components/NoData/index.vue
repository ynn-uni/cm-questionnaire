<template>
  <div class="nodata flex align-center justify-center">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.nodata {
  width: 100%;
  font-size: 16px;
  color: $textPrimary;
  line-height: 20px;
}
</style>
