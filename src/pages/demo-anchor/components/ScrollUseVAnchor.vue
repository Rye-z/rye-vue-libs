<script setup>
// [offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
// - 它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。
// [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)
// - HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。

// 位置保持
import VAnchor from './v-anchor/VAnchor'
import VAnchorLink from './v-anchor/VAnchorLink'

const refContainer = ref(null)

const route = useRoute()
const router = useRouter()
const handleAnchorChange = (link) => {
  router.replace(`${route.path}${link}`)
}
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-36 border-4 border-amber-100 border-solid sticky top-0 h-[15%]" />
    <div
      ref="refContainer"
      class="grid grid-cols-4 h-screen overflow-y-auto relative h-[80%]"
      style="scroll-behavior: smooth"
    >
      <!-- S Anchor -->
      <VAnchor :get-container="refContainer" @change="handleAnchorChange">
        <VAnchorLink
          v-for="item in [
            { name: 'to title', href: '#title' },
            { name: 'to content1', href: '#content1' },
            { name: 'to content2', href: '#content2' },
            { name: 'to content3', href: '#content3' },
            { name: 'to footer', href: '#footer' },
          ]"
          :key="item.name"
          :title="item.name"
          :href="item.href"
        />
      </VAnchor>
      <!-- E Anchor -->

      <!-- S Content -->
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
      <!-- E Content -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-link-active {
  color: red;
}
</style>
