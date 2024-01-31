<!-- 实体对象 -->
<template>
    <div id="cesiumContainer"></div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';

onMounted(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false,
        terrainProvider: Cesium.createWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true
        })
    });

    // 设置地球的初始位置
    const initialPosition = Cesium.Cartesian3.fromDegrees(112.199265, 31.035423, 60000); // 荆门的经纬度，高度为10,000,000米
    viewer.camera.setView({
        destination: initialPosition,
    });

    //添加实体对象
    const blueBox = viewer.entities.add({
        name: 'box',
        position: Cesium.Cartesian3.fromDegrees(112.199265, 31.035423, 0),
        box: {
            //指定长宽高
            dimensions: new Cesium.Cartesian3(400.0, 300.0, 500.0),
            material: Cesium.Color.BLUE,
            //控制再一定范围内显示
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                1.0e3,
                6.0e3
            ),
            //设置位置是否根据鼠标移动
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
    })

    //椭圆
    const greenCircle = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(112.209265, 31.035423, 0.0),
        name: "Green circle at height with outline",
        ellipse: {
            semiMajorAxis: 600.0, //长半轴
            semiMinorAxis: 300.0, //短半轴
            height: 300.0,//距离地面的高度
            material: Cesium.Color.GREEN,
            outline: true, // 
            extrudedHeight: 200.0,
            numberOfVerticalLines: 6, //沿轮廓的周长绘制的垂直线的数量
            // stRotation: 0.0, // 纹理从北方逆时针旋转
            // granularity: Cesium.Math.RADIANS_PER_DEGREE, // 椭圆上各点之间的角距离
            rotation: Cesium.Math.toRadians(45)
            // classificationType: Cesium.ClassificationType.TERRAIN,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
    });
    viewer.zoomTo(viewer.entities);


})
</script>
<style scoped lang='scss'></style>