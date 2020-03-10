import { getAction, postAction } from '@/utils/request'

/**
 * 创建问卷
 * @param {*} data
 * cid 课程id
 * title 问卷标题
 * content 问卷简介
 * questions 问卷问题
 * start 问卷开始时间
 * end 问卷结束时间
 * status 问卷状态
 * sort 问卷排序
 */
export function createSurvey(data = {}) {
  return postAction('/Questionnaire/addQuestionnaire', data)
}

/**
 * 分享问卷
 * @param {*} data
 */
export function shareSurvey(data = {}) {
  return postAction('/Questionnaire/shareQuestionnaire', data)
}

/**
 * 获取我创建的问卷列表
 * @param {*} data
 * page 当前页码
 * size 每页条数
 */
export function getMySurveyList(data = {}) {
  return postAction('/Questionnaire/getCreateQuestionnaireList', data)
}
/**
 * 获取我分享的问卷列表
 * @param {*} data
 * page 当前页码
 * size 每页条数
 */
export function getShareSurveyList(data = {}) {
  return postAction('/Questionnaire/getShareQuestionnaireList', data)
}
/**
 * 获取所有课程的问卷列表
 */
export function getCourseSurveyList() {
  return getAction('/Questionnaire/getCourseQuestionnaireList')
}

