<template>
    <!-- 火焰效果 -->
    <div class="my-index">
        <button @click="onInit">渲染火焰</button>
        <button @click="onClear">清除</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import * as Cesium from 'cesium';
import { useStore } from "vuex";
import FireEffect from "@/utils/cesiumCtrl/fire"

const store = useStore();

const { viewer } = store.state

onMounted(() => {
    // 设置地球的初始位置
    const initialPosition = Cesium.Cartesian3.fromDegrees(112.199265, 32.035423, 10000000); // 荆门的经纬度，高度为10,000,000米
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

let fire: any
const onInit = async () => {
    viewer.camera.flyTo({
        // 从以度为单位的经度和纬度值返回笛卡尔3位置。
        destination: Cesium.Cartesian3.fromDegrees(120.361, 36.0885, 80),
        orientation: {
            direction: new Cesium.Cartesian3(0.7458181136018, -0.4270255968894706, 0.5112773034515067),
            up: new Cesium.Cartesian3(-0.19274344830978868, 0.5963500021825172, 0.7792410654159365)
        },
        duration: 3, // 飞行时间（s）
    })

    setTimeout(() => {
        fire = new FireEffect(viewer)
    }, 3000);


}

const onClear = () => {
    fire.remove()
}
onUnmounted(() => {
    if (fire) {
        fire.remove()
    }
})



</script>

<style scoped>
.my-index {
    position: absolute;
    left: 11%;
    top: 2%;
    z-index: 99;

    button {
        margin-right: 4px;
    }
}
</style>