<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'
let viewer
onMounted(() => {
    viewer = new Cesium.Viewer('cesiumContainer', {});
})


</script>
  
<style scoped></style>