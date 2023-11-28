/**
 * @brief 实现Cesium1.98各种数据加载的方法类
 * @param {String} url gltf的地址
 * @param {Array} linePositions 线坐标的一维数组
 */
import * as Cesium from 'cesium'
class LoadData {
    //构造函数
    constructor() {
        this.model = null
    }
    //gltf数据加载
    addGltfModel(url, viewer) {
        //设定模型的位置，东北上坐标系，朝向
        let origin = Cesium.Cartesian3.fromDegrees(118.7975, 32.0171, -6)
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin)

        //控制双轴旋转
        var quaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, Cesium.Math.toRadians(-90));//绕Z轴旋转
        var quaternion2 = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Y, Cesium.Math.toRadians(0));//绕Y轴旋转
        var combinedQuaternion = Cesium.Quaternion.multiply(quaternion, quaternion2, new Cesium.Quaternion());
        var rotation = new Cesium.Matrix3();
        Cesium.Matrix3.fromQuaternion(combinedQuaternion, rotation)
        var newModelMatrix = Cesium.Matrix4.multiplyByMatrix3(modelMatrix, rotation, new Cesium.Matrix4());

        //正式加载
        this.model = Cesium.Model.fromGltf({
            url: `${url}`,
            modelMatrix: newModelMatrix,
            minimumPixelSize: 128,
            scale: 0.95,
        })
        viewer.scene.primitives.add(this.model)

        //模型初始加载时，去掉水面模型
        this.model.readyPromise.then(() => {

        })

        //相机视角漫游
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(118.79571071071288, 32.0165083628853, 43.939026369824354),
            orientation: {
                heading: 1.191094628042772,
                pitch: -0.14150746498186884,
                roll: 0.0000029411615960484028
            },
        })
        return this.model
    }

    //geoJson数据加载
    addGeojson(url, viewer) {
        let geojsonData = `${url}`
        Cesium.GeoJsonDataSource.load(geojsonData).then(res => {
            console.log(res, '---res')
            let data = res
            viewer.entities.add(data.entities.values[0]);
            viewer.zoomTo(data.entities.values[0])
        })
    }

    //添加实体线
    addEntityPoint(viewer, linePositions) {
        let lineEntity = viewer.entities.add({
            name: 'add entity line',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(linePositions),
                width: 2,
                material: Cesium.Color.RED,
                clampToGround: true
            }
        })
        return lineEntity
    }

    //通过图元添加贴底线
    addPromitiveLine(viewer, linePositions) {
        viewer.scene.primitives.add(
            new Cesium.GroundPrimitive({
                geometryInstances: new Cesium.GeometryInstance({
                    geometry: new Cesium.CorridorGeometry({
                        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
                        positions: Cesium.Cartesian3.fromDegreesArray(linePositions),
                        width: 40
                    }),
                    attributes: {
                        color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0.0, 1.0, 0.0, 0.5))
                    }
                }),
                classificationType: Cesium.ClassificationType.TERRAIN
            }),
        )
    }

    //数据清除
    removeGltfData(viewer) {
        viewer.scene.primitives.remove(this.model)
        // viewer.camera.flyHome(1) 
    }

    //geojson数据清除
    removeGeojson(viewer) {
        viewer.entities.removeAll()
        // viewer.scene.primitives.removeAll()
        // viewer.camera.flyHome(1)
    }
}
export default LoadData