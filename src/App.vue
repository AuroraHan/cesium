<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';

onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    //设置地形
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true
    })
  });
})


</script>

<style scoped></style>
