import { getAction, postAction } from '@/utils/request'

export function getSmsCode(data = {}) {
  console.log(data)
  return getAction('/Common/getSmsCode', data)
}
export function checkSmsCode(data = {}) {
  return postAction('/Common/checkSmsCode', data)
}
export function getUserInfo(data = {}) {
  return getAction('/User/getUserInfo', data)
}
// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
