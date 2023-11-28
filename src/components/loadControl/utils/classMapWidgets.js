/**
 * @brief 地图控件
 * @param {Object} viewer Cesium中一切API的起源
 */
import * as Cesium from 'cesium'
import CesiumNavigation from "cesium-navigation-es6";
class MapWidgets {

    //设置地图控件
    setMapWidgets(viewer) {
        let options = {}
        // options.defaultResetView = Rectangle.fromDegrees(80, 22, 130, 50)
        options.defaultResetView = new Cesium.Cartographic(
            Cesium.Math.toRadians(111.75522333617076),
            Cesium.Math.toRadians(33.53716751392908),
            500
        );

        // //相机方向
        options.orientation = {
            heading: Cesium.Math.toRadians(5.971364953154598),
            pitch: Cesium.Math.toRadians(-90),
            roll: Cesium.Math.toRadians(0.000011374106645867244),
        };
        //相机延时
        options.duration = 4; //默认为3s

        options.enableCompass = true
        options.enableZoomControls = true;
        options.enableDistanceLegend = true;
        options.enableCompassOuterRing = true;

        options.resetTooltip = "重置视图";
        options.zoomInTooltip = "放大";
        options.zoomOutTooltip = "缩小";
        new CesiumNavigation(viewer, options);
    }
}
export default MapWidgets