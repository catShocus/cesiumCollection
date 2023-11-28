/**
 * @brief 地图基础配置类
 */
import * as Cesium from 'cesium'
class MapConfig {
    constructor() {

    }

    setTerrain(viewer) {
        //开启地形深度检测
        viewer.scene.globe.depthTestAgainstTerrain = true
        //添加Cesium自带地形
        viewer.terrainProvider = Cesium.createWorldTerrain({
            requestVertexNormals: true,
            requestWaterMask: true,
        });
    }

    destroyConfig(viewer) {
        viewer.scene.globe.depthTestAgainstTerrain = false
        // viewer.terrainProvider = undefined
    }
}
export default MapConfig