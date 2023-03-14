<script setup>
// props
import { useInjectAnchor } from './context'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  // URL 的 #hash 值
  href: {
    type: String,
    default: '',
  },
})

// use inject
const {
  registerLink,
  unregisterLink,
  handleClick: handleContextClick,
  activeLink,
  scrollTo,
} = useInjectAnchor()

const handleClick = () => {
  handleContextClick(props.href)
  scrollTo(props.href)
}

onMounted(() => {
  registerLink(props.href)
})
onBeforeUnmount(() => {
  unregisterLink(props.href)
})
</script>

<template>
  <div>
    <a
      :href="props.href" :class="{ 'active-link': activeLink === props.href }"
      @click="handleClick"
    >{{ title }}
    </a>
  </div>
</template>

<style scoped lang="scss">
a:hover {
  color: blue
}

.active-link {
  color: red
}
</style>
