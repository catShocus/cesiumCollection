import ComputeCirculate from './computeCirculateFlight'
import * as Cesium from 'cesium'
class AddCustomPolygon {
    constructor() {
        this.positonArr = []
    }
    addPolygon(viewer) {
        let computeCirculateFlight = new ComputeCirculate();
        this.positonArr = computeCirculateFlight.computeCirculateFlight(
            -112.210693,
            36.0994841,
            3000
        );
        viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(this.positonArr)
                ),
                height: 0.0,
                extrudedHeight: 1000.0,
                outline: true,
                outlineColor: 1,
                material: Cesium.Color.WHITE.withAlpha(0.5),
            },
        });
        viewer.zoomTo(viewer.entities)
    }

    //遍历加载
    addTraversePolygon(viewer) {
        for (let i = 0; i < this.positonArr.length; i = i + 2) {
            return viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(this.positonArr[i], this.positonArr[i + 1]),
                point: {
                    show: true,
                    color: Cesium.Color.SKYBLUE,
                    pixelSize: 10,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 3
                }
            })
        }
    }

    //移除实体
    removeSector(viewer) {
        viewer.entities.removeAll()
    }

}
export default AddCustomPolygon