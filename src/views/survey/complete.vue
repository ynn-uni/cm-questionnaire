<template>
  <div class="complete">
    <div class="content">
      <img class="header-img" src="../../assets/images/fly.png">
      <h3>您的答卷已经提交，<wbr>感谢您的参与！</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.complete {
  min-height: 100vh;
  display: flex;
  padding: 45px;
  background: #f3f6fa;
  text-align: center;
  .header-img {
    max-width: 300px;
    width: 100%;
    margin: auto;
  }
  .content {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 45px;
    box-shadow: 0px 1px 6px 0px rgba(205, 220, 245, 1);
    background: #fff;
    color: $textPrimary;
  }
}
@media screen and (max-width: 786px){
  .complete {
    padding: 15px;
  }
}
</style>
