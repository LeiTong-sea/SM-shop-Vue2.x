import store from '@/store'
import axios from 'axios'
// 引包Toast
import { Toast } from 'vant'
// 创建axios实例，将来对创建出来的实例进行自定义配置 不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})
// 自定义配置 请求/响应 拦截器
// 一定是instance的实例方法，这样才可以不污染原始的axios实例·
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })

    // 只要有token，就在请求时携带以便于请求需要授权的接口
    const token = store.getters.token
    if (token) {
      config.headers['Access-token'] = token
      config.headers.platform = 'H5'
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data
    if (res.status !== 200) {
      // 弹窗提示
      Toast(res.message)
      // 报错提示
      return Promise.reject(res.message)
      // 提供的接口有问题，不管输入什么错误图形验证码都不会返回500，这里仅训练操作，不做处理！！！！！
    } else {
      Toast.clear()
    }
    return res
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 导出实例
export default instance
