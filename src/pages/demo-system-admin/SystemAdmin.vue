<script setup lang="ts">
import useLoginStore from '@/store/useLoginStore'

const loginStore = useLoginStore()
const logout = () => {
  loginStore.doLogout()
}
</script>

<template>
  <div class="flex w-1/3 justify-between content-center">
    <h1 class="text-3xl font-bold underline">
      SystemAdmin
    </h1>
    <el-button @click="logout">
      退出
    </el-button>
  </div>
  <div>
    <el-button @click="$router.push('/admin/user')">
      user admin
    </el-button>
    <el-button @click="$router.push('/admin/menu')">
      menu admin
    </el-button>
  </div>
  <router-view />
</template>

<style scoped>

</style>
