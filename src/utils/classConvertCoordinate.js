/**
 * @brief Cesium坐标转换的方法类
 */
class ConvertCoordinate {
    constructor(viewer) {
        this.viewer = viewer
    }

    //屏幕坐标转世界坐标
    screenToCartesian3(px) {
        if (this.viewer && px) {
            let picks = this.viewer.scene.drillPick(px);
            let cartesian = null;
            let isOn3dtiles = false,
                isOnTerrain = false;
            // drillPick
            for (let i in picks) {
                let pick = picks[i];

                if (
                    (pick && pick.primitive instanceof Cesium.Cesium3DTileFeature) ||
                    (pick && pick.primitive instanceof Cesium.Cesium3DTileset) ||
                    (pick && pick.primitive instanceof Cesium.Model)
                ) {
                    //模型上拾取
                    isOn3dtiles = true;
                }
                // 3dtilset
                if (isOn3dtiles) {
                    this.viewer.scene.pick(px); // pick
                    cartesian = this.viewer.scene.pickPosition(px);
                    if (cartesian) {
                        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        if (cartographic.height < 0) cartographic.height = 0;
                        let lon = Cesium.Math.toDegrees(cartographic.longitude),
                            lat = Cesium.Math.toDegrees(cartographic.latitude),
                            height = cartographic.height;
                        cartesian = this.transformWGS84ToCartesian({
                            lng: lon,
                            lat: lat,
                            alt: height
                        });
                    }
                }
            }
            // 地形
            let boolTerrain =
                this.viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider;
            // Terrain
            if (!isOn3dtiles && !boolTerrain) {
                var ray = this.viewer.scene.camera.getPickRay(px);
                if (!ray) return null;
                cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
                isOnTerrain = true;
            }
            // 地球
            if (!isOn3dtiles && !isOnTerrain && boolTerrain) {
                cartesian = this.viewer.scene.camera.pickEllipsoid(
                    px,
                    this.viewer.scene.globe.ellipsoid
                );
            }
            if (cartesian) {
                let position = this.transformCartesianToWGS84(cartesian);
                if (position.alt < 0) {
                    cartesian = this.transformWGS84ToCartesian(position, 0.1);
                }
                return cartesian;
            }
            return false;
        }

    }
}
export default ConvertCoordinate