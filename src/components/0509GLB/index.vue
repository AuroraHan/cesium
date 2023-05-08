<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MWFmMjMwYS05NDA2LTQwMDQtYjcyZC1hZjFhYTFiMWMyYmIiLCJpZCI6MTMxNjg1LCJpYXQiOjE2ODIxNTY3NDB9.C4Ga99OWyhq6kwu_D09bTu-WshUX48mvqGrF-T7ou1I'
let viewer: Cesium.Viewer

const addModel = (url: string, height: number) => {
    viewer.entities.removeAll();
    const position = Cesium.Cartesian3.fromDegrees(
        120.059,
        36.328,
        height
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
    );
    const entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000,
            clippingPlanes: new Cesium.ClippingPlaneCollection({
                planes: [
                    new Cesium.ClippingPlane(new Cesium.Cartesian3(0, 0, 1), 0)
                ],
                edgeWidth: 1,
                edgeColor: Cesium.Color.RED,
                enabled: true,
                // edgeMaterial: new Cesium.PolylineOutlineMaterialProperty({
                //     color: Cesium.Color.RED,
                //     outlineWidth: 1,
                //     outlineColor: Cesium.Color.BLACK
                // }),
            })
        },
    });
    viewer.trackedEntity = entity;
}

onMounted(() => {
    viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false
    });
    addModel('/public/glb/Cesium_Air.glb', 4000)
})


</script>
  
<style scoped></style>