import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  // eslint-disable-next-line no-unused-vars
  successCode,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
// eslint-disable-next-line no-unused-vars
import { isArray } from '@/utils/validate'
import { message } from 'ant-design-vue'

let loadingInstance

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  if (code === 401) {
    message.error(msg || '登录失效')
    store.dispatch('user/resetAll').catch(() => {})
  } else if (code === 403) {
    message.error('权限不足或登录状态过期，请重新登录')
    store.dispatch('user/resetAll').catch(() => {})
    router.push({ path: '/login' }).catch(() => {})
    // const data = {
    //   refresh: store.getters['user/refreshToken'],
    // }
    // refreshToken(data).catch(() => {
    //   message.error('Token错误，请重新登录')
    //   router.push({ path: '/login' })
    // })
  } else {
    message.error(msg || `后端接口${code}异常`)
  }
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      // config.headers[tokenName] = store.getters['user/accessToken']
      config.headers['Authorization'] =
        'Bearer ' + store.getters['user/accessToken']
    }
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    if (debounce.some((item) => config.url.includes(item))) {
      //这里写加载动画
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close()
    console.log('response', response, response.data)
    return response
    // const { data, config } = response
    // const { code, msg } = data
    // 操作正常Code数组
    // const codeVerificationArray = isArray(successCode)
    //   ? [...successCode]
    //   : [...[successCode]]
    // 是否操作正常
    // if (codeVerificationArray.includes(code)) {
    //   return data
    // } else {
    //   handleCode(code, msg)
    //   return Promise.reject(
    //     'vue-admin-beautiful请求异常拦截:' +
    //       JSON.stringify({ url: config.url, code, msg }) || 'Error'
    //   )
    // }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    console.log('error', response, message)
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(
        status,
        data.detail || JSON.stringify(data, null, 2) + '\n' + message
      )
      return Promise.reject(error)
    } else {
      let { message: msg } = error
      if (msg === 'Network Error') {
        msg = '后端接口连接异常'
      }
      if (msg.includes('timeout')) {
        msg = '后端接口请求超时'
      }
      if (msg.includes('Request failed with status code')) {
        const code = msg.substr(msg.length - 3)
        msg = '后端接口' + code + '异常'
      }
      message.error(msg || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

export default instance
