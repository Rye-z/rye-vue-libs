<script setup lang="ts">
// 功能1：标题高亮
import type { PropType } from 'vue'
import { useProvideAnchor } from './context'
import { easeInOutCubic } from '@/components/_utils/easings'

const props = defineProps({
  getContainer: {
    type: Function as PropType<() => AnchorContainer>,
    default: () => window,
  },
  scroll: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits([
  'click',
])

type AnchorContainer = HTMLElement | Window

enum CType {
  Window = 'Window',
  Element = 'Element',
}

const state = reactive({
  links: [],
  container: null,
  containerType: 'window',
  animating: false,
})
const activeLink = ref('')

const shapeLinkRegex = /#(\w+)/
const setActiveLink = (link) => {
  // 防止在滚动期间，标题像走马灯一样挨个点亮
  if (state.animating)
    return

  nextTick(() => {
    activeLink.value = link
    window.location.hash = link
  })
}
const registerLink = (link: string) => {
  if (!state.links.includes(link))
    state.links.push(link)
}
const unregisterLink = (link) => {
  const index = state.links.indexOf(link)
  state.links.splice(index, 1)
}

const getElementByHref = (href) => {
  const id = shapeLinkRegex.exec(href)[1]
  return document.getElementById(id)
}

interface ScrollToOptions {
  y: number
  scrolledTop: number
  /** 默认 450 */
  duration: number
}

const scrollTo = (callback, options: ScrollToOptions) => {
  // 「a.href」 和 「元素 id」会覆盖 window.scrollTo 或者 Element.scrollTo 行为
  // 所以使用 requestAnimationFrame 来优化这个行为
  const {
    y,
    scrolledTop,
    duration,
  } = options
  const startTime = Date.now()

  const frameFunc = () => {
    const timeStamp = Date.now()
    const time = timeStamp - startTime
    const nextScrollTop = easeInOutCubic(time, scrolledTop, y, duration)
    state.container.scrollTo({
      top: nextScrollTop,
    })
    if (time < duration)
      requestAnimationFrame(frameFunc)
    else
      callback()
  }
  frameFunc()
}

const handleScrollTo = (href) => {
  if (!props.scroll)
    return
  // 获取元素真实 DOM
  const el = getElementByHref(href)
  if (!el)
    return

  // 1. 获取「滚动容器」已滚动的距离
  const containerScrolledTop = state.container.scrollTop
  // 2. 获取目标元素距离「滚动容器」上边距的距离 -> 都是相对于视口的距离，差值即是元素相对于滚动容器的距离
  let scrollTargetOffset
  if (state.containerType === CType.Window)
    // 当「滚动容器」是 window 时，此时元素距离「原点」的距离就是需要滚动的距离
    scrollTargetOffset = el.getBoundingClientRect().top
  else
    scrollTargetOffset = el.getBoundingClientRect().top - state.container.getBoundingClientRect().top

  const y = containerScrolledTop + scrollTargetOffset

  state.animating = true
  scrollTo(() => {
    state.animating = false
    setActiveLink(href)
  }, {
    y,
    scrolledTop: containerScrolledTop,
    duration: 300,
  })
}

const handleClick = (href) => {
  setActiveLink(href)
  emits('click', activeLink.value)
}

// 标题高亮监测
const anchor = ref('')
const createWatcher = () => {
  const height = (state.container as HTMLElement).clientHeight

  const options: IntersectionObserverInit = {
    threshold: [0],
    root: state.containerType === CType.Window
      ? null
      : state.container as HTMLElement,
    rootMargin: `0px 0px -${height - 20}px 0px`,
  }

  const io = new IntersectionObserver((entries) => {
    // 如果是第一次加载页面，则判断是否存在 hash 值，如果存在 hash 值，则利用 `<a>` 自己定位的功能跳转至具体位置
    if (anchor.value) {
      setActiveLink(anchor.value)
      anchor.value = ''
      return
    }
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRect.width || entry.intersectionRect.height)
        setActiveLink(`#${entry.target.id}`)
    })
  }, options)

  // 对需要高亮的标题进行监听
  state.links.forEach((link) => {
    const el = getElementByHref(link)
    if (el)
      io.observe(el)
  })
  return io
}

useProvideAnchor({
  registerLink,
  unregisterLink,
  activeLink,
  scrollTo: handleScrollTo,
  handleClick,
})

let io: IntersectionObserver = ref(null)

onMounted(() => {
  state.container = props.getContainer()
  state.containerType = state.container === window ? CType.Window : CType.Element
  if (state.containerType === CType.Window)
    state.container = document.documentElement

  nextTick(() => {
    anchor.value = window.location.hash
    io = createWatcher()
  })
})

onUnmounted(() => io.disconnect())
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
