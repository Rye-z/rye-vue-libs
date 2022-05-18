import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { doLogin, doLogout, fetchRoutes } from '@/api/login.js'

const createStoreItem = (key, initialVal) => {
  const useStorageSerializers = () => ({
    write: v => (v
      ? JSON.stringify(v)
      : ''),
    read: v => v && JSON.parse(v),
  })

  return useStorage(
    key,
    initialVal,
    localStorage,
    {
      serializer: useStorageSerializers(),
    },
  )
}

const useLoginStore = defineStore({
  id: 'LOGIN_ADMIN',
  state: () => ({
    sessionId: createStoreItem('sessionId', ''),
    allowRoutes: createStoreItem('allowRoutes', ''),
  }),
  actions: {
    async doLogin() {
      const result = await gTools.fetchWrapper(doLogin)
      this.sessionId = result.sessionId
    },

    async doLogout() {
      gTools.fetchWrapper(doLogout)
      this.allowRoutes = []
      this.sessionId = ''
    },

    async fetchRoutes() {
      const result = await gTools.fetchWrapper(fetchRoutes)

      if (result.error)
        console.error(result.error)

      this.allowRoutes = result

      return result
    },
  },
})

export default useLoginStore
