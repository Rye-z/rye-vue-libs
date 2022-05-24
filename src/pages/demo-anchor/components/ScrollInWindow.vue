<script setup>
const route = useRoute()
const router = useRouter()

const getAnchorKey = (key) => {
  return document.getElementById(key.slice(1))
}

const goRoute = (anchor) => {
  router.push(`${route.path}${anchor}`)
}

const handleLinkClick = (el, anchor) => {
  goRoute(anchor)
  const to = getAnchorKey(anchor)
  if (el) {
    el.scrollTo({
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
</script>

<template>
  <div>
    <div
      class="col-span-1 fixed top-0 h-1/5 border-solid border-2 border-cyan-100 rounded-2xl flex flex-col p-2"
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
        @click="handleLinkClick(null, item.anchor)"
      >
        {{ item.name }}
      </a>
    </div>

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
