import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const role = store.getters.userInfo && store.getters.userInfo.type
    if (value) {
      if (!(value === role)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
