
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

export function getTeacherCourseList(data = {}) {
  return getAction('/Course/getTeacherCourseList', data)
}
// /Course/getCourseDetails
export function getCourseDetails(data = {}) {
  return getAction('/Course/getCourseDetails', data)
}

// 获取所有课程列表 /Course/getCourseList
export function getCourseList(data = {}) {
  return getAction('/Course/getCourseList', data)
}
// 获取学生课程列表 /Student/getCourseList
export function getStudentCourseList(data = {}) {
  return getAction('/Course/getStudentCourseList', data)
}
// 加入课程 /Course/joinCourse
export function joinCourse(data = {}) {
  return getAction('/Course/joinCourse', data)
}
// 删除课程
export function delCourse(data = {}) {
  return getAction('/Course/delCourse', data)
}
