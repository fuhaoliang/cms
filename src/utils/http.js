import services from './services'
import axios from 'axios'
import utils from './utils'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

const https = require('https')

/**
 * 构造接口请求方法
 * @author wangyipeng
 */
const Agent = new https.Agent({
  rejectUnauthorized: false
})

const jrAxios = axios.create({
  timeout: 30000,
  httpsAgent: Agent
})

const tipMsg = {
  '401': '请重新登录',
  '403': '未授权'
}
// 请求拦截
jrAxios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 添加响应拦截器
jrAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.resolve(error)
  }
)

const Http = {}

for (const i in services) {
  const service = services[i]
  const serviceHost = service['host']
  Http[i] = {}
  for (const ind in service) {
    if (ind === 'host') {
      continue
    }
    const api = service[ind]
    Http[i][ind] = async function (params, options = {}, headers = {}, isNeedStatus = false, withCredentials = false) {
      let apiUrl = api.url
      const newParams = {}
      options = Object.assign({ loading: false, show: false, error: true, mock: false, proxy: false }, options)
      if (params) {
        utils.each(params, function (ind, param) {
          if (apiUrl.indexOf('{' + ind + '}') > -1) {
            apiUrl = apiUrl.replace('{' + ind + '}', param)
          } else {
            newParams[ind] = param
          }
        })
      }
      let data = newParams
      if (Array.isArray(params) || params instanceof FormData) {
        data = params
      }
      const config = {
        headers: {},
        withCredentials: withCredentials
      }

      if (headers.permission) {
        console.info('权限判断')
      } else {
        config.headers = headers
      }
      if (options.loading) {
        store.dispatch('ToggleLoading', true)
      }
      if (options.show) {
        store.dispatch('ToggleLoadingShow', true)
      }
      const host = ((api.mock || options.mock) && process.env.NODE_ENV === 'development') || options.proxy ? '' : serviceHost
      // console.info('host----->', host)
      let response = {}
      if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
        response = await jrAxios[api.method](host + apiUrl, data, config)
      } else {
        config.params = newParams
        response = await jrAxios[api.method](host + apiUrl, config)
      }
      const errorObj = {
        status: {
          code: -1,
          message: 'Error: Network Error'
        }
      }
      if (response.response) {
        errorObj.status.code = response.response.status
        errorObj.status.message = response.response.status + ' ' + (response.response.statusText ? response.response.statusText : tipMsg[response.response.status])
        if (errorObj.status.code === 401) {
          console.log('goto login')
        }
        if (response.response.data && response.response.data.error_code) {
          errorObj.status.message = response.response.data.msg
        }
        response = response.response
      }
      if (response.status === 200 || response.status === 201) {
      } else {
        response.data = errorObj
        if (options.error) {
          Message.error(errorObj.status.message)
        }
      }
      if (!isNeedStatus) {
        response = response.data
      }
      if (options.loading) {
        store.dispatch('ToggleLoading', false)
      }
      if (options.show) {
        store.dispatch('ToggleLoadingShow', false)
      }
      return response
    }
  }
}

export default Http
