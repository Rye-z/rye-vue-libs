<script setup>
import { useInjectAnchor } from './context'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
})

const {
  registerLink,
  unregisterLink,
  activeLink,
  handleClick: contextHandleClick,
  scrollTo,
} = useInjectAnchor()

const handleClick = () => {
  contextHandleClick()
  scrollTo(props.href)
}

onMounted(() => {
  // 注册链接
  registerLink(props.href)
})

onBeforeUnmount(() => {
  // 取消注册链接
  unregisterLink(props.href)
})
</script>

<template>
  <div class="hover:cursor-pointer hover:text-blue-700">
    <a
      :href="props.href"
      :class="{ active: activeLink === props.href }"
      @click="handleClick"
    >{{ props.title }}
    </a>
  </div>
</template>

<style scoped lang="scss">
.active {
  color: blue;
}
</style>
