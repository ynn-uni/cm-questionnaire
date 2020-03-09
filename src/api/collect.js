import { getAction } from '@/utils/request'
export function addCousetOrCancleCollectrse(data = {}) {
  return getAction('/Collect/setOrCancleCollect', data)
}
