<script setup>
// 1. 窗体滚动
// 2. 元素滚动

import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import demoWindow from './components/ScrollInWindow'
import demoElement from './components/ScrollInElement'
import demoUseATag from './components/ScrollUseATag'
import demoUseVAnchor from './components/ScrollUseVAnchor'
import demoUseZAnchor from './components/ScrollUseZAnchor.vue'

const route = useRoute()
const router = useRouter()

const demos = {
  demoWindow,
  demoElement,
  demoUseVAnchor,
  demoUseATag,
  demoUseZAnchor,
}

const demoType = ref('')
const changeQueryType = (type) => {
  router.push(`${route.path}?type=${type}`)
}

const handleClick = (type) => {
  demoType.value = type
  changeQueryType(demoType.value)
}

onBeforeRouteUpdate((to, from) => {
  demoType.value = to.query.type
})

onMounted(() => {
  demoType.value = route.query.type || 'demoWindow'
  changeQueryType(demoType.value)
})
</script>

<template>
  <div>
    <div class="flex flex-col fixed top-0 gap-2">
      <el-button type="primary" @click="handleClick('demoWindow')">
        窗体滚动
      </el-button>
      <div />
      <el-button
        type="primary"
        @click="handleClick('demoElement')"
      >
        元素滚动
      </el-button>
      <div />
      <el-button type="primary" @click="handleClick('demoUseATag')">
        a标签锚点
      </el-button>
      <div />
      <el-button type="primary" @click="handleClick('demoUseVAnchor')">
        VAnchor
      </el-button>
      <el-button type="primary" @click="handleClick('demoUseZAnchor')">
        ZAnchor
      </el-button>
    </div>
    <div class="ml-32">
      <component :is="demos[demoType]" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
