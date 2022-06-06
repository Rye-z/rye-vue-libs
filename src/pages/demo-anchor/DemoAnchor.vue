<script setup>
// 1. 窗体滚动
// 2. 元素滚动

const route = useRoute()
</script>

<template>
  <div>
    <div class="flex flex-col fixed top-0 gap-2">
      <el-button type="primary" @click="$router.push(`/demo/anchor/window`)">
        窗体滚动
      </el-button>
      <div />
      <el-button type="primary" @click="$router.push(`/demo/anchor/element`)">
        元素滚动
      </el-button>
      <div />
      <el-button type="primary" @click="$router.push(`/demo/anchor/v-anchor`)">
        a标签锚点
      </el-button>
    </div>
    <div class="ml-32">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
