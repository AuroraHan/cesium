import { ref, watch } from "vue";
import * as Cesium from "cesium";
const longitude = ref();
const latitude = ref();
export function useMousePosition(
  element: HTMLCanvasElement,
  viewer: Cesium.Viewer,
  traget: HTMLDivElement
) {
  let handler = new Cesium.ScreenSpaceEventHandler(element);
  let eventType = Cesium.ScreenSpaceEventType.LEFT_CLICK;

  handler.setInputAction((event: any) => {
    //讲屏幕像素转成经纬度
    let cartesian3 = viewer.scene.camera.pickEllipsoid(event.position);
    let cartorgraphic = Cesium.Cartographic.fromCartesian(cartesian3!);
    longitude.value = Cesium.Math.toDegrees(cartorgraphic.longitude).toFixed(3);
    latitude.value = Cesium.Math.toDegrees(cartorgraphic.latitude).toFixed(3);
    traget.innerText = `经度:${longitude.value}  纬度:${latitude.value}`;
  }, eventType);
}
