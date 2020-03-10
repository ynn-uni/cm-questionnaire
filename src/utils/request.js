import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({// http://rap2.taobao.org:38080/app/mock/245873
  // baseURL: 'http://192.168.1.65:9501'
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response && response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg || '未知错误，请联系管理员！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function getAction(url = '', data = {}) {
  return service({
    url,
    method: 'get',
    params: data

  })
}
export function postAction(url = '', data = {}) {
  return service({
    url,
    method: 'post',
    data

  })
}
export default service
