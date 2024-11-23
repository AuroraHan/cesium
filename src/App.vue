<template>
  <div class="container">
    <div class="left">
      案例描述
    </div>
    <div class="right">
      <div id="cesiumContainer"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import store from "@/store/store";
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MWFmMjMwYS05NDA2LTQwMDQtYjcyZC1hZjFhYTFiMWMyYmIiLCJpZCI6MTMxNjg1LCJpYXQiOjE2ODIxNTY3NDB9.C4Ga99OWyhq6kwu_D09bTu-WshUX48mvqGrF-T7ou1I'

onMounted(() => {
  init()
})

const init = () => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
  });
  let layer = new Cesium.UrlTemplateImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  });
  viewer.imageryLayers.addImageryProvider(layer);

  //去除logo
  // viewer.cesiumWidget.creditContainer.style.display = false
  //显示帧率
  viewer.scene.debugShowFramesPerSecond = true;
  viewer.scene.globe.depthTestAgainstTerrain = true;

  store.commit('initViewer', viewer)

  // 监听点击事件，拾取坐标
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((e: any) => {
    const clickPosition = viewer.scene.camera.pickEllipsoid(e.position);
    const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition!);
    console.log(
      "经度：" +
      Cesium.Math.toDegrees(randiansPos.longitude) +
      ", 纬度：" +
      Cesium.Math.toDegrees(randiansPos.latitude)
    );
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.left {
  width: 10%;
  height: 100%;
  background-color: aqua;
}

.right {
  width: 90%;
  height: 100%;
  background-color: rebeccapurple;
}

#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
