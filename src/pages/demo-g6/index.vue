<script setup>
import G6 from '@antv/g6'
import { graphData as data } from './data'

// ================ Emits / Props / Stores / Hooks ================
const props = defineProps({})
const emits = defineEmits([])
// ================ Template Refs ================
const graphRef = ref()

// ================ Main ================
const graph = ref(null)

const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7',
]
const strokes = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
]

const nodes = data.nodes
const clusterMap = new Map()
let clusterId = 0
nodes.forEach((node) => {
  // cluster
  if (node.cluster && clusterMap.get(node.cluster) === undefined) {
    clusterMap.set(node.cluster, clusterId)
    clusterId++
  }
  const cid = clusterMap.get(node.cluster)
  if (!node.style)
    node.style = {}

  node.style.fill = colors[cid % colors.length]
  node.style.stroke = strokes[cid % strokes.length]
})
const render = () => {
  const width = graphRef.value.scrollWidth / 2
  const height = graphRef.value.scrollHeight || 800
  graph.value = new G6.Graph({
    container: graphRef.value,
    width,
    height,
    modes: {
      default: ['drag-node'],
    },
    animate: true,
    defaultNode: {
      size: 20,
      // style: {
      //   lineWidth: 2,
      // },
    },
    defaultEdge: {
      // size: 1,
      // color: '#e2e2e2',
      // style: {
      //   endArrow: {
      //     path: 'M 0,0 L 8,4 L 8,-4 Z',
      //     fill: '#e2e2e2',
      //   },
      // },
    },
    layout: {
      type: 'fruchterman',
      gravity: 10,
      gpuEnabled: true,
      clustering: true,
      maxIteration: 300,
    },
    fitView: true,
    fitViewPadding: [20, 20, 20, 20],
  })
  graph.value.data(data)
  graph.value.render()
}

onMounted(() => {
  render()
})

// ================ Life Circle / Watch ================
</script>

<template>
  <div ref="graphRef" />
</template>

<style scoped lang="less">
</style>
