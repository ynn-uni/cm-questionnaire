import { getAction, postAction } from '@/utils/request'

export function getSmsCode(data = {}) {
  return getAction('/Common/getSmsCode', data)
}
export function checkSmsCode(data = {}) {
  return postAction('/Common/checkSmsCode', data)
}
export function getUserInfo(data = {}) {
  return getAction('/User/getUserInfo', data)
}
export function setUserInfo(data = {}) {
  return postAction('/User/setUserInfo', data)
}
