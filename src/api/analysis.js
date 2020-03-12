import { getAction } from '@/utils/request'
export function getUserCensus(data = {}) {
  return getAction('/User/getUserCensus', data)
}
// 扇形图
export function getAnswerCakeCensus(data = {}) {
  return getAction('/Questionnaire/getAnswerCakeCensus', data)
}
// 折线图 /Questionnaire/getAnswerLineCensus
export function getAnswerLineCensus(data = {}) {
  return getAction('/Questionnaire/getAnswerLineCensus', data)
}
