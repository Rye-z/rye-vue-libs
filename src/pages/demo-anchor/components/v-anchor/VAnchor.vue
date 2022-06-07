<script setup lang="ts">
import useProvideAnchor from './context'
import addEventListener from '@/components/DOM/addEventListener'
import getScroll from '@/components/_utils/getScroll'
import scrollTo from '@/components/_utils/scrollTo'

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

const sharpMatcherRegx = /#([\S ]+)$/

const activeLink = ref(null)
const state = reactive({
  links: [],
  scrollContainer: null,
  scrollEvent: null,
  // 相当于一个锁，当滚动事件触发时，不再触发滚动事件
  animating: false,
})

// Element or Window
let container = null

// 获取元素相对于滚动容器上边距的距离
function getOffsetTop(el, container) {
  // ??? 判断el占据区域是否有矩形元素
  if (!el.getClientRects().length)
    return 0

  const rect = el.getBoundingClientRect()

  if (rect.width || rect.height) {
    if (container === window) {
      // ??? 如果滚动容器是 window，减去边框的宽度
      container = el.ownerDocument!.documentElement!
      // html 的 clientTop 啥时候有值？
      return rect.top - container.clientTop
    }

    return rect.top - (container as HTMLElement).getBoundingClientRect().top
  }

  return rect.top
}

// get scroll container
function getContainer() {
  container = typeof props.getContainer === 'string'
    ? document.getElementById(props.getContainer)
    : props.getContainer
  return container
}

function getCurrentAnchor(offsetTop = 0, bounds = 5) {
  const linkSections = []
  // 遍历获取每个锚点元素的 offsetTop，并判断当前滚动的位置是否在该元素的 offsetTop 之内
  state.links.forEach((link) => {
    const container = getContainer()
    const sharpLinkMatch = sharpMatcherRegx.exec(link.toString())
    if (!sharpLinkMatch)
      return

    const target = document.getElementById(sharpLinkMatch[1])
    if (target) {
      // 获取相对于滚动容器上边距的距离
      const top = getOffsetTop(target, container)
      // 判断当前元素位置到【滚动容器】上边距的距离是否在 offsetTop(偏移量) + bounds(判定区域) 内
      // 可以类比 intersectionObserver 的 threshold 属性
      if (top < offsetTop + bounds) {
        // 存储 top 属性，方便作比较
        linkSections.push({
          link,
          top,
        })
      }
    }
  })

  if (linkSections.length) {
    const maxSection = linkSections.reduce((prev, curr) => {
      return curr.top > prev.top ? curr : prev
    })
    return maxSection.link
  }
  return ''
}

function handleScrollTo(link) {
  setCurrentActiveLink(link)

  const container = getContainer()
  // 获取当前【scrollContainer】已经滚动的距离
  const scrollTop = getScroll(container, true)

  const sharpLinkMatch = sharpMatcherRegx.exec(link)
  if (!sharpLinkMatch)
    return

  const targetElement = document.getElementById(sharpLinkMatch[1])
  if (!targetElement)
    return

  const eleOffsetTop = getOffsetTop(targetElement, container)

  const y = scrollTop + eleOffsetTop
  state.animating = true

  scrollTo(y, {
    callback: () => {
      state.animating = false
    },
    getContainer,
    duration: 100,
  })
}

function handleScroll() {
  // 当点击连接触发页面滚动时，不再触发监听滚动事件
  if (state.animating)
    return

  const currentActiveLink = getCurrentAnchor()
  setCurrentActiveLink(currentActiveLink)
}

function setCurrentActiveLink(link) {
  if (activeLink.value === link)
    return

  activeLink.value = link
  emits('change', link)
}

onMounted(() => {
  // 初始化 state
  nextTick(() => {
    state.scrollContainer = getContainer()
    state.scrollEvent = addEventListener(state.scrollContainer, 'scroll', handleScroll)
    // 添加监听事件，设置激活的链接
    handleScroll()
  })
})

onBeforeUnmount(() => {
  // 取消监听事件
  if (state.scrollEvent)
    state.scrollEvent.remove()
})

onUpdated(() => {
  // 如果滚动容器发生了改变??
  if (state.scrollEvent) {
    const currentContainer = getContainer()
    if (state.scrollContainer !== currentContainer) {
      state.scrollContainer = currentContainer
      state.scrollEvent.remove()
      state.scrollEvent = addEventListener(state.scrollContainer, 'scroll', handleScroll)
      handleScroll()
    }
  }
})

useProvideAnchor(
  {
    registerLink: (link: string) => {
      if (!state.links.includes(link))
        state.links.push(link)
    },
    unregisterLink: (link: string) => {
      const index = state.links.indexOf(link)
      if (index !== -1)
        state.links.splice(index, 1)
    },
    activeLink,
    scrollTo: handleScrollTo,
    handleClick() {
      // 点击事件
      emits('click', activeLink.value)
    },
  },
)

defineExpose({
  scrollTo: handleScrollTo,
})
</script>

<template>
  <div class="sticky top-0 h-1/5 border-solid border-2 border-cyan-100 flex flex-col">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
