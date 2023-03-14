<script setup>
import ZAnchor from './z-anchor/ZAnchor.vue'
import ZAnchorLink from './z-anchor/ZAnchorLink.vue'

const handleClick = () => {}
</script>

<template>
  <div>
    <ZAnchor
      scroll
      class="col-span-1 fixed top-0 h-1/5 border-solid border-2 border-cyan-100 rounded-2xl flex flex-col p-2"
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

    <div class="ml-40">
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
</template>

<style scoped lang="scss">

</style>
