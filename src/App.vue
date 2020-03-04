<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 权限判断指令
import permission from '@/directive/permission/index.js'
export default {
  name: 'App',
  directives: { permission }
}
</script>
