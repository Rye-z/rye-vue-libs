<script setup>
// [offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
// - 它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。
// [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)
// - HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。

// 位置保持
const refContainer = ref(null)

const router = useRouter()
const route = useRoute()

const isTitleActive = computed(() => {
  return (anchor) => {
    return route.fullPath.split('#')[1] === (anchor.startsWith('#') ? anchor.slice(1) : anchor)
  }
})

const getScrollKey = (key) => {
  return document.getElementById(key.startsWith('#') ? key.slice(1) : key)
}

const goRoute = (anchor) => {
  router.push(`${route.path}${anchor}`)
}

const handleScroll = (el, anchor) => {
  const to = getScrollKey(anchor)
  if (el) {
    unref(el).scrollTo({
      top: to.offsetTop,
      behavior: 'smooth',
    })
  }
  else {
    window.scrollTo({
      top: to.offsetTop,
      behavior: 'smooth',
    })
  }
}
const handleLinkClick = (el, anchor) => {
  goRoute(anchor)
  handleScroll(el, anchor)
}

// 页面刷新或首次加载时判断是否跳转至锚点位置
onMounted(() => {
  const anchorName = route.fullPath.split('#')[1]
  if (!anchorName)
    return
  handleScroll(refContainer, anchorName)
})
// 高亮
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-36 border-4 border-amber-100 border-solid sticky top-0" />
    <div id="container" ref="refContainer" class="grid grid-cols-4 h-screen overflow-y-auto relative">
      <div
        class="col-span-1 sticky top-0 h-1/5 border-solid border-2 border-cyan-100 flex flex-col"
      >
        <a
          v-for="item in [
            { name: 'to title', anchor: '#title' },
            { name: 'to content1', anchor: '#content1' },
            { name: 'to content2', anchor: '#content2' },
            { name: 'to content3', anchor: '#content3' },
            { name: 'to footer', anchor: '#footer' },
          ]"
          :key="item.anchor"
          class="hover:cursor-pointer hover:text-blue-700"
          :class="{ 'router-link-active': isTitleActive(item.anchor) }"
          @click="handleLinkClick(refContainer, item.anchor)"
        >
          {{ item.name }}
        </a>
      </div>
      <div class="col-span-3">
        <div id="title" class="h-screen">
          title
        </div>
        <div
          v-for="item in [
            { id: 'content1', name: 'content1' },
            { id: 'content2', name: 'content2' },
            { id: 'content3', name: 'content3' },
          ]"
          :id="item.id"
          :key="item.id"
          class="h-96 border-solid border-8 border-blue-300 my-5"
        >
          {{ item.name }}
        </div>
        <div id="footer" class="h-screen">
          footer
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-link-active {
  color: red;
}
</style>
