import axios from 'axios'

const instance = axios.create({})

instance.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
)
// todo 规范 response 返回格式
instance.interceptors.response.use(({
  data,
  headers,
}) => {
  // 返回是否为图片
  if (headers['content-type']?.indexOf('image') > -1)
    return data

  // Status Code 为 200，而响应体中 code 不为200，此时为自定义错误
  if (!data.success) {
    const { code } = data

    if (code === 4011)
      return Promise.reject({ msg: '用户名或者密码错误' })

    return Promise.reject(data)
  }

  return data.data
}, (error) => {
  if (error.response.status === 400)
    return Promise.reject({ msg: '错误的请求格式' })

  if (error.response.status === 401) {
    // 清除过期 Cookie
    localStorage.clear()

    // expired 参数主要是用于路由导航时用于: 是否为首次加载 的辅助判断
    const isClientRedirect = () => window.location.search.includes('redirect_uri')
      && window.location.search.includes('client_id')

    isClientRedirect()
      ? window.location.href = `${window.location.href}&expired=1`
      : window.location.href = '/login?expired=1'
  }

  if (error.response?.data) {
    const { data } = error.response

    if (typeof data === 'object')
      return Promise.reject(data)

    return Promise.reject({ msg: data })
  }

  return Promise.reject({ msg: '发生未知错误' })
})

export default instance
