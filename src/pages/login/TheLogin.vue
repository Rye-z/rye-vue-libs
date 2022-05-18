<script setup lang="ts">
import { useTimeout } from '@vueuse/core'
import useLoginStore from '@/store/useLoginStore.js'

const router = useRouter()
const loginStore = useLoginStore()

onMounted(async () => {
  await loginStore.doLogin()
  await loginStore.fetchRoutes()
  await useTimeout(2000)
  router.push('/system-admin')
})
</script>

<template>
  <div>
    这是登陆页面
  </div>
</template>

<style scoped lang="scss">

</style>
