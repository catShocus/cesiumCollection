/**
 * @brief 添加弧段线类型
 */
import * as Cesium from 'cesium'
class PolylineSegmental {
    addRedLine(viewer) {
        viewer.entities.add({
            name: 'Red line on terrain',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
                width: 5,
                material: Cesium.Color.RED,
                clampToGround: true
            }
        })
    }

    addGreenRhumbLine(viewer) {
        viewer.entities.add({
            name: 'Green rhumb line',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
                width: 5,
                arcType: Cesium.ArcType.RHUMB,
                material: Cesium.Color.GREEN,
            }
        })
    }

    addGlowingLine(viewer) {
        viewer.entities.add({
            name: 'Glowing blue line on the surface',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
                width: 10,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    taperPower: 0.5,
                    color: Cesium.Color.CORNFLOWERBLUE
                })
            }
        })
    }

    addOrangeOutlined(viewer) {
        viewer.entities.add({
            name: 'Orange line with black outline at height and following the surface',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([-75, 39, 250000, -125, 39, 250000]),
                width: 5,
                material: new Cesium.PolylineOutlineMaterialProperty({
                    outlineWidth: 2,
                    outlineColor: Cesium.Color.BLACK,
                    color: Cesium.Color.ORANGE
                })
            }
        })
    }

    addPurpleArrow(viewer) {
        viewer.entities.add({
            name: 'Purple straight arrow at height',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([-75, 43, 500000, -125, 43, 500000]),
                width: 10,
                arcType: Cesium.ArcType.NONE,
                material: new Cesium.PolylineArrowMaterialProperty(
                    Cesium.Color.PURPLE
                )
            }
        })
    }

    addDashedLine(viewer) {
        viewer.entities.add({
            name: 'Blue dashed line',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([-75, 43, 500000, -125, 45, 500000]),
                width: 4,
                arcType: Cesium.ArcType.NONE,
                material: new Cesium.PolylineDashMaterialProperty(
                    {
                        color: Cesium.Color.CYAN
                    }
                )
            }
        })
    }
}
export default PolylineSegmental