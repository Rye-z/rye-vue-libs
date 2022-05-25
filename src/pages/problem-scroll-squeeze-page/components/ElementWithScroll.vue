<script setup>
const scrollVisible = ref(false)
const el = ref(null)
</script>

<template>
  <el-button
    @click="scrollVisible = !scrollVisible"
  >
    {{ scrollVisible ? '隐藏' : '显示' }}
  </el-button>
  <div
    ref="el"
    class="border border-2 border-blue-300 h-screen w-[300px] "
    :class="{ 'overflow-y-scroll': scrollVisible }"
  >
    a long long long long long long long long long long long long long long long long long long sentence
  </div>
</template>

<style scoped lang="scss">

</style>
