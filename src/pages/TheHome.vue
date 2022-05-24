<script setup>
const router = useRouter()
const routes = router.getRoutes()
</script>

<template>
  <div class=" grid place-items-center">
    <div
      v-for="item in routes" :key="item.path"
      class="
    hover:underline hover:decoration-amber-200 decoration-4 text-xl
  "
    >
      <router-link :to="item.path">
        {{ item?.meta?.des }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
