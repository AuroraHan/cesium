<template>
    <!-- <div class="btn1" @click="addEarch">按钮1</div> -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import { useStore } from "vuex";

const store = useStore();

const { viewer } = store.state

onMounted(() => {
    console.log(viewer,'1111');
    // const viewer = new Cesium.Viewer('cesiumContainer', {
    //     infoBox: false,
    //     //设置地形
    //     // terrainProvider: Cesium.createWorldTerrain({
    //     //     requestWaterMask: true,
    //     //     requestVertexNormals: true
    //     // })
    // });

    // 设置地球的初始位置
    const initialPosition = Cesium.Cartesian3.fromDegrees(112.199265, 31.035423,10000000); // 荆门的经纬度，高度为10,000,000米
    viewer.scene.camera.setView({
        destination: initialPosition,
        // orientation: {
        //     heading: Cesium.Math.toRadians(0),     // 指南针方向（北方向为0度）
        //     pitch: Cesium.Math.toRadians(20),    // 俯仰角
        //     roll: 0                                // 横滚角
        // }
    });

    //加载高德地图
    var gaodeImageryProvider = new Cesium.UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        maximumLevel: 17,
        minimumLevel: 1,
        credit: 'Amap'
    })
    viewer.imageryLayers.addImageryProvider(gaodeImageryProvider)

    //加载地形数据
    // const terrainProvider = new Cesium.CesiumTerrainProvider({
    //     url: Cesium.IonResource.fromAssetId(1),
    //     requestWaterMask: true,//请求水体效果所需要的海岸线数据
    //     requestVertexNormals: true,//请求地形照明数据
    // })
    // viewer.terrainProvider = terrainProvider
})

const addEarch =async ()=>{
    const initialPosition = Cesium.Cartesian3.fromDegrees(112.199265, 31.035423, 6000000); // 荆门的经纬度，高度为10,000,000米
    viewer.scene.camera.setView({
        destination: initialPosition,
        // orientation: {
        //     heading: Cesium.Math.toRadians(0),     // 指南针方向（北方向为0度）
        //     pitch: Cesium.Math.toRadians(20),    // 俯仰角
        //     roll: 0                                // 横滚角
        // }
    });
}


</script>

<style scoped>
.btn1{
    position: absolute;
    left: 100px;
    top: 0;
    width: 100px;
    height: 40px;
    background-color: red;
    z-index: 99;
}
</style>