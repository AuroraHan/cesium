<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MWFmMjMwYS05NDA2LTQwMDQtYjcyZC1hZjFhYTFiMWMyYmIiLCJpZCI6MTMxNjg1LCJpYXQiOjE2ODIxNTY3NDB9.C4Ga99OWyhq6kwu_D09bTu-WshUX48mvqGrF-T7ou1I'
let viewer: Cesium.Viewer

onMounted(() => {
    initViewer()
})

const initViewer = async () => {
    viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false
    })

    //开启地形深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;
    let tileset = await Cesium.Cesium3DTileset.fromUrl("/public/tiles/tiles.json")
    viewer.scene.primitives.add(tileset);

    viewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(
            0.0,
            -0.5,
            tileset.boundingSphere.radius * 2.0
        )
    );

    // adjustTilesetHeight(tileset, 200)
    // let height = 0
    // setInterval(() => {
    //     adjustTilesetHeight(tileset, height++)
    // }, 1000)
}

//调整高度
function adjustTilesetHeight(tileset: Cesium.Cesium3DTileset, height = 10) {
    //计算出模型包围球的中心点(弧度制)
    const cartographic = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
    );
    //计算与模型包围球中心点经纬度相同的地表点位
    const surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
    );
    //计算调整高度后的模型包围球的中心点
    const offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        height
    );
    //计算差向量
    const translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
    );
    //修改模型的变换矩阵
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}


</script>
  
<style scoped></style>