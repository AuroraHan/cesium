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