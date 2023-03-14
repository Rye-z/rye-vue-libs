<script setup>
// 位置保持
import ZAnchor from './z-anchor/ZAnchor.vue'
import ZAnchorLink from './z-anchor/ZAnchorLink.vue'

const refContainer = ref(null)

const router = useRouter()
const handleLinkClick = (link) => {
  console.log(link)
}
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-36 border-4 border-amber-100 border-solid sticky top-0 h-[15%]" />
    <div
      ref="refContainer"
      class="grid grid-cols-4 h-screen overflow-y-auto relative h-[80%]"
    >
      <!-- S Anchor -->
      <ZAnchor
        scroll
        :get-container="() => refContainer"
        class="sticky top-0 h-1/5 border-solid border-2 border-cyan-100 flex flex-col"
        @click="handleLinkClick"
      >
        <ZAnchorLink
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
      </ZAnchor>
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
