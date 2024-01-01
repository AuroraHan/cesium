<template>
    <div id="cesiumContainer"></div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

onMounted(async () => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
    });

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

    let selectFeature: Cesium.Cesium3DTileFeature
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((ele) => {

        //将上次选中的颜色设置为白色
        if (selectFeature) {
            selectFeature.color = Cesium.Color.WHITE
        }

        //获取选中要素
        selectFeature = viewer.scene.pick(ele.position)
        if (!selectFeature) return;
        let obj = {} as Record<string, any>
        selectFeature.getPropertyIds().forEach((key) => {
            console.log(key);
            obj[key] = selectFeature.getProperty(key)
        })
        selectFeature.color = Cesium.Color.RED
        console.log(selectFeature);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

})


</script>
  
<style scoped></style>
  