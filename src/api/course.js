import request from '@/utils/request'

export function getCourseList(data) {
  return request({
    url: '/Curse/getCurseList',
    method: 'get',
    data
  })
}

