/**
 * @brief Cesium坐标转换的方法类
 */
import * as Cesium from 'cesium'
class ConvertCoordinate {
    constructor(viewer) {
        this.viewer = viewer
    }

    //坐标拾取
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

    //坐标转换（WGS84 TO Cartesian）
    transformWGS84ToCartesian(position, alt) {
        if (this.viewer) {
            return position
                ? Cesium.Cartesian3.fromDegrees(
                    position.lng || position.lon,
                    position.lat,
                    (position.alt = alt || position.alt),
                    Cesium.Ellipsoid.WGS84
                )
                : Cesium.Cartesian3.ZERO;
        }
    }

    //坐标转换（Cartesian to WGS84）
    transformCartesianToWGS84(cartesian) {
        if (this.viewer && cartesian) {
            var ellipsoid = Cesium.Ellipsoid.WGS84;
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            return {
                lng: Cesium.Math.toDegrees(cartographic.longitude),
                lat: Cesium.Math.toDegrees(cartographic.latitude),
                alt: cartographic.height
            };
        }
    }


}
export default ConvertCoordinate