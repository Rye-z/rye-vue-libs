<script setup lang="ts">
import { useTimeout } from '@vueuse/core'
import useLoginStore from '@/store/useLoginStore'

const router = useRouter()
const loginStore = useLoginStore()

const login = async () => {
  await loginStore.doLogin()
  await loginStore.fetchRoutes()
  router.push('/admin')
}
</script>

<template>
  <div>
    这是登陆页面
    <el-button type="primary" @click="login">
      登陆
    </el-button>
  </div>
</template>

<style scoped lang="scss">

</style>
