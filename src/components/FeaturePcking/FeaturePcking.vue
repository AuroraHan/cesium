<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

onMounted(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: new Cesium.TileMapServiceImageryProvider({
            url: 'node_modules/cesium/Build/CesiumUnminified/Assets/Textures/NaturalEarthII',
        })
    });
})


</script>
  
<style scoped></style>
  