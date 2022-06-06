<script setup>
import useProvideAnchor from './context'

const props = defineProps({
  getContainer: {
    type: [String, Object],
    default: window,
  },
})
const emits = defineEmits([
  'change',
  'click',
])

const activeLink = ref(null)

// Element or Window
let container = null
function getContainer() {
  // todo 错误判断 el 为空
  container = typeof props.getContainer === 'string'
    ? document.getElementById(props.getContainer)
    : getContainer
}

// 获取滚动距离
function getScroll() {}

function handleScrollTo() {}

function handleScroll() {}

function setCurrentActiveLink() {}

onMounted(() => {
  // 添加监听事件，设置激活的链接
  handleScroll()
})

onBeforeUnmount(() => {
  // 取消监听事件
})

useProvideAnchor(
  {
    activeLink,
    scrollTo: handleScrollTo,
    handleClick() {
      // 点击事件
      emits('click')
    },
  },
)
</script>

<template>
  <div class="sticky top-0 h-1/5 border-solid border-2 border-cyan-100 flex flex-col">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
