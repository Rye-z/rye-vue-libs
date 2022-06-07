<script setup lang="ts">
import {
  useIntersectionObserver,
} from '@vueuse/core'

const props = defineProps({
  el: {
    default: null,
    required: true,
  },
})
const emit = defineEmits(['load', 'intersect'])
const el = computed(() => props.el)
// 监听组件首次出现在视口时的事件，仅使用一次，比如：首次出现时加载数据
const { stop } = useIntersectionObserver(
  el,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      emit('load', isIntersecting)
      stop()
    }
  },
)
// 设置视口交互位置，监听 el 元素出现在视口位置时的事件，比如：设置侧边栏高亮标题
useIntersectionObserver(
  el,
  async ([{ isIntersecting }]) => {
    if (isIntersecting)
      emit('intersect', isIntersecting)
  },
  {
    rootMargin: `-80px 0px -${window.innerHeight - 100}px 0px`,
    threshold: [0],
  },
)
</script>

<template>
  <slot />
</template>

<style scoped lang="scss">

</style>
