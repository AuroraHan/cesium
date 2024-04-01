<!-- 实体对象 -->
<template>
    <div id="cesiumContainer"></div>
    <div class="panel">
        <div ref="lonAndlat"></div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { useMousePosition } from "@/hooks/useMousePosition";
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MWFmMjMwYS05NDA2LTQwMDQtYjcyZC1hZjFhYTFiMWMyYmIiLCJpZCI6MTMxNjg1LCJpYXQiOjE2ODIxNTY3NDB9.C4Ga99OWyhq6kwu_D09bTu-WshUX48mvqGrF-T7ou1I'

const lonAndlat = ref()

onMounted(async () => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false,
        terrainProvider: await Cesium.createWorldTerrainAsync({
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
            rotation: Cesium.Math.toRadians(45) //旋转角度
            // classificationType: Cesium.ClassificationType.TERRAIN,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
    });


    //鼠标点击获取经纬度
    useMousePosition(viewer.canvas, viewer, lonAndlat.value)

    //走廊
    const redCorridor = viewer.entities.add({
        name: 'redcorridor',
        position: Cesium.Cartesian3.fromDegrees(112.189265, 31.035423, 0.0),
        corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                112.18,
                31.03,
                112.17,
                31.03,
                112.17,
                31.02,
            ]),
            width: 400.0,
            height: 400.0,
            cornerType: Cesium.CornerType.BEVELED,
            extrudedHeight: 700.0,
            material: Cesium.Color.RED.withAlpha(0.5),
        }
    })
    viewer.zoomTo(viewer.entities);

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    let eventType = Cesium.ScreenSpaceEventType.LEFT_CLICK;
    handler.setInputAction((event: any) => {
        var pickedEntities = drillPickEntities(viewer, event.position);
        console.log(pickedEntities);
    }, eventType);

    //自动添加监听
    viewer.selectedEntityChanged.addEventListener((entity) => {

    })


})

//拾取点击的实体
const drillPickEntities = (viewer: Cesium.Viewer, windowPosition: any) => {
    var i;
    var entity;
    var picked;
    var pickedPrimitives = viewer.scene.drillPick(windowPosition);
    var length = pickedPrimitives.length;
    var result = [];
    var hash = {};

    for (i = 0; i < length; i++) {
        picked = pickedPrimitives[i];
        entity = Cesium.defaultValue(picked.id, picked.primitive.id);
        if (
            entity instanceof Cesium.Entity &&
            !Cesium.defined(hash[entity.id])
        ) {
            result.push(entity);
            hash[entity.id] = true;
        }
    }
    return result;
}
</script>
<style scoped>
.panel {
    position: absolute;
    top: 5%;
    left: 3%;
    width: 200px;
    height: 30px;
    background-color: #fff;
    opacity: 0.6;
    border-radius: 4px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
}
</style>