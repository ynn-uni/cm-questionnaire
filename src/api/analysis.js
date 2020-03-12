import { getAction } from '@/utils/request'
export function getUserCensus(data = {}) {
  return getAction('/User/getUserCensus', data)
}
export function getAnswerCakeCensus(data = {}) {
  return getAction('/Questionnaire/getAnswerCakeCensus', data)
}
