
import { getAction, postAction } from '@/utils/request'
// export function addCourse(url='',data = {}) {
//   return postAction(url: '/Curse/addCourse',data)
// }

export function addCourse(data = {}) {
  return postAction('/Course/addCourse', data)
}
export function editCourse(data = {}) {
  return postAction('/Course/editCourse', data)
}

export function teacherGetCourse(data = {}) {
  return getAction('/Course/getTeacherCourseList', data)
}
// /Course/getCourseDetails
export function getCourseDetails(data = {}) {
  return getAction('/Course/getCourseDetails', data)
}
