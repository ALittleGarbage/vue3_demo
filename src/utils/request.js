import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import { refreshToken } from '@/api/users'
import { ElMessage } from 'element-plus'
import router from '@/router/index'

const request = axios.create()

// 请求拦截器 设置token
request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {}
  }
  const tokenStore = useTokenStore()
  config.headers.Authorization = tokenStore.getToken?.access_token
  return config
})

let isRefreshing = false
let refreshQueue = []
// 响应拦截器 刷新token
request.interceptors.response.use(
  (resp) => resp,
  async (err) => {
    // 401 Unauthorized
    if (err.response.status == 401) {
      if (!isRefreshing) {
        try {
          isRefreshing = true
          const tokenStore = useTokenStore()
          const resp = await refreshToken(tokenStore.getToken?.refresh_token)
          if (resp.data.success) {
            // 保存token
            tokenStore.setToken(JSON.stringify(resp.data.content))
            // 再次执行前面的请求
            refreshQueue.forEach((callback) => callback())
            refreshQueue = []
            // 再次执行当前请求
            return request(err.config)
          } else {
            // refresh_token失效，去登录
            ElMessage.error('登录信息失效，请重新登录')
            tokenStore.clearToken()
            // 重新登录
            router.push({ name: 'Login' })
            return Promise.reject(err)
          }
        } finally {
          isRefreshing = false
        }
      } else {
        // 如果处于刷新token期间，直接放入缓存队列
        return new Promise((resolve) => {
          refreshQueue.push(() => resolve(request(err.config)))
        })
      }
    }
    return Promise.reject(err)
  }
)

export default request
