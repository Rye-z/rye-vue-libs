import axios from '@/api/axios'

export function doLogin() {
  const data = {
    sessionId: 'sessionId',
  }
  return new Promise(resolve => setTimeout(() => resolve(data), 1000))
}

export function doLogout() {
  return axios.post('/api/logout')
}

export function fetchRoutes() {
  const data = [
    'USER_ADMIN',
    'ADMIN',
  ]

  return new Promise(resolve => setTimeout(() => resolve(data), 1000))
  // return axios.get('/api/user/routes')
}
