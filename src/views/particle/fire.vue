<template>
    <!-- 火焰效果 -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import { useStore } from "vuex";

const store = useStore();

const { viewer } = store.state

onMounted(() => {
    console.log(viewer,'火焰效果');

    // 设置地球的初始位置
    const initialPosition = Cesium.Cartesian3.fromDegrees(112.199265, 32.035423,10000000); // 荆门的经纬度，高度为10,000,000米
    viewer.scene.camera.setView({
        destination: initialPosition,
    });

    //加载高德地图
    var gaodeImageryProvider = new Cesium.UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        maximumLevel: 17,
        minimumLevel: 1,
        credit: 'Amap'
    })
    viewer.imageryLayers.addImageryProvider(gaodeImageryProvider)
})



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