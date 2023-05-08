<template>
  <!-- <router-view></router-view>
   -->
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MWFmMjMwYS05NDA2LTQwMDQtYjcyZC1hZjFhYTFiMWMyYmIiLCJpZCI6MTMxNjg1LCJpYXQiOjE2ODIxNTY3NDB9.C4Ga99OWyhq6kwu_D09bTu-WshUX48mvqGrF-T7ou1I'
window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'

onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // terrainProvider: Cesium.createWorldTerrain(),
    // imageryProvider: new Cesium.TileMapServiceImageryProvider({
    //   url: 'node_modules/cesium/Build/CesiumUnminified/Assets/Textures/NaturalEarthII',
    // })
  });
  // const imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
  //   url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
  // });
  // viewer.imageryLayers.addImageryProvider(imageryProvider);
  // let layer_mapbox = new Cesium.MapboxStyleImageryProvider({
  //   url: "https://api.mapbox.com/styles/v1",
  //   username: "18251827232",
  //   styleId: "cl25yd6a400f314nuqan9i8hi",
  //   accessToken: "pk.eyJ1IjoiMTgyNTE4MjcyMzIiLCJhIjoiY2wyNGY4bmdvMTM3ZjNqbzUxbWc1Yml5dyJ9.gP_TR5sxxKYeHelFzQnrvA",
  //   scaleFactor: true
  // });
  // viewer.imageryLayers.addImageryProvider(layer_mapbox);

  // let layer = new Cesium.UrlTemplateImageryProvider({
  //   url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  // });
  // viewer.imageryLayers.addImageryProvider(layer);
})
</script>

<style scoped></style>
