<script setup>
const router = useRouter()

const routes = router.getRoutes()
</script>

<template>
  <div
    v-for="item in routes" :key="item.path"
    class="grid grid-cols-3 border-2 border-solid border-gray-200 rounded-lg p-2 my-2"
  >
    <div>{{ item.name }}</div>
    <div>{{ item.path }}</div>
    <div>{{ item.components.default }}</div>
  </div>
</template>

<style scoped lang="scss">

</style>
