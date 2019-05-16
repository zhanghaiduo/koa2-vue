import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken, TokenKey } from '@/utils/auth'
import { transform } from '@/utils/transformRequest'
const service = axios.create({
  //
  // baseURL: location.host.split(':')[0] === 'localhost' ? 'http://dev.hahaipi.com/smsi/index.php' : `http://${location.host}/smsi/index.php`, // api的base_url
  timeout: 60000, // 请求超时时间
  transformRequest: [transform()]
})
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken
const removePending = (config) => {
  for (const p in pending) {
    if (pending[p].u === config.url + '&' + config.method + JSON.stringify(config.data)) { // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers[TokenKey] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    removePending(config) // 在一个ajax发送前执行一下取消操作

    config.CancelToken = new CancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method + JSON.stringify(config.data), f: c })
    })
    return config
  }, error => {
  // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非1是抛错 可结合自己业务进行修改
     */
    if (getToken()) {
    }// 每次请求刷新cookie时间
    const res = response.data
    if (res.code && res.code !== 1) {
      Message({ message: res.msg, type: 'error', duration: 5 * 1000 })
      if (res.code === -886) {
        removeToken()
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({ message: error, type: 'error', duration: 5 * 1000 })
    if (error === 'Cancel') {
      return Promise.reject('重复点击请求关闭', error)
    } else if (error.includes('err')) {
      return Promise.reject(error)
    } else {
      Message({
        message: error.msg && error.msg.includes('timeout') ? '请求超时，请稍后再试哦' : error.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
)

export default service
