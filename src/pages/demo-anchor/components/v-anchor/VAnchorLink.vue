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
  handleClick: contextHandleClick,
  scrollTo,
} = useInjectAnchor()

const handleClick = () => {
  contextHandleClick()
  scrollTo(props.href)
}
</script>

<template>
  <div class="hover:cursor-pointer hover:text-blue-700">
    <a
      :href="props.href"
      onclick="return false"
      @click="handleClick"
    >{{ props.title }}
    </a>
  </div>
</template>

<style scoped lang="scss">

</style>
