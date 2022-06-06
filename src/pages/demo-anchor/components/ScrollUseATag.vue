<script setup>
// [offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
// - 它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。
// [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)
// - HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。

// 位置保持
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-36 border-4 border-amber-100 border-solid sticky top-0 h-[15%]">
      <p>通过 a 标签设置锚点，需要注意滚动容器的高度</p>
      <p>如果设置了</p>
      <p>设置滚动容器区域不要超出设置 overflow-hidden 容器的视口区域</p>
      <p>设置滚动容器样式 `scroll-behavior: smooth`</p>
    </div>
    <div
      ref="refContainer"
      class="grid grid-cols-4 h-screen overflow-y-auto relative h-[80%]"
      style="scroll-behavior: smooth"
    >
      <!-- S Anchor -->
      <div
        class="col-span-1 sticky top-0 h-1/5 border-solid border-2 border-cyan-100 flex flex-col"
      >
        <a
          v-for="item in [
            { name: 'to title', href: '#title' },
            { name: 'to content1', href: '#content1' },
            { name: 'to content2', href: '#content2' },
            { name: 'to content3', href: '#content3' },
            { name: 'to footer', href: '#footer' },
          ]"
          :key="item.href"
          :href="item.href"
          class="hover:cursor-pointer hover:text-blue-700"
        >
          {{ item.name }}
        </a>
      </div>
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
