import { getAction } from '@/utils/request'
// 收藏  取消收藏
export function addCousetOrCancleCollectrse(data = {}) {
  return getAction('/Collect/setOrCancleCollect', data)
}
// 收藏列表
export function getStudentCollectList(data = {}) {
  return getAction('/Student/getCollectList', data)
}
