<script setup>
import { RouteTypes } from '../router'

const router = useRouter()
const routes = router.getRoutes()

const typeMap = {}
for (const routeTypesKey in RouteTypes)
  typeMap[routeTypesKey] = []

const hasTitle = (item) => {
  return item?.meta?.des
}

routes.forEach((item) => {
  if (typeMap[item?.meta?.type] && hasTitle(item))
    typeMap[item.meta.type].push(item)
})
</script>

<template>
  <div class="grid p-8">
    <div v-for="type in RouteTypes" :key="type">
      <div class="text-lg font-bold mt-8">
        {{ type }}
      </div>
      <div
        v-for="item in typeMap[type]" :key="item.path"
        class=" hover:underline hover:decoration-amber-200 decoration-4 text-xl"
      >
        <router-link :to="item.path">
          {{ item?.meta?.des }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
