<script setup lang="ts">
import ElementWithScroll from '@/pages/problem-scroll-squeeze-page/components/ElementWithScroll.vue'
import PageWithoutScroll from '@/pages/problem-scroll-squeeze-page/components/PageWithoutScroll.vue'
import PageWithScroll from '@/pages/problem-scroll-squeeze-page/components/PageWithScroll.vue'

enum Types {
  pageWithScroll,
  pageWithoutScroll,
  ElementWithScroll,
}

const activeName = ref(Types.pageWithScroll)
</script>

<template>
  <div class="fixed top-0 right-0 border-2 border-solid border-cyan-200 rounded-2xl h-44 w-44 mr-[calc(100%-100vw+20px)]" />
  <div class="p-10">
    <div class="border border-2 rounded-2xl border-blue-300 p-10 mb-4">
      <p>滚动条挤压页面情况</p>
      <p>一般出现在页面内容切换时，从原本有滚动条的情况 => 没有滚动条 => 会造成页面的晃动，体验会不太好</p>
      <p>1. page 页的内容宽度设置的是一样的，但由于一个页面有滚动条，另一个没有，所以出现了内容被滚动条挤压的情况，<b>我们期望的情况应该是页面内容的宽度是不变的</b></p>
      <p>- 可以利用一个负 margin 来处理</p>
      <br>
      <p>2. 如果有 fixed 定位的元素，也要考虑，定位时预留出滚动条宽度</p>
      <br>
      <p>以下是复现：</p>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="PageWithoutScroll" lazy>
        <PageWithoutScroll />
      </el-tab-pane>
      <el-tab-pane label="PageWithScroll" lazy>
        <PageWithScroll />
      </el-tab-pane>
      <el-tab-pane label="ElementWithScroll" lazy>
        <ElementWithScroll />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">

</style>

<style lang="scss">
// 需要考虑兼容性问题，不推荐
//body {
//  overflow: overlay;
//}

// 兼容性高
body {
  overflow-x: hidden;
  margin-right: calc(100% - 100vw);
}
</style>
