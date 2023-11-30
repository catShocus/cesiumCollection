/**
 * @brief 通过图元加载
 */
import * as Cesium from 'cesium'
class LoadByPrimitive {
    constructor() {
        this.M = null;
        this.textCanvas = null
    }
    //文字转canvas
    setTextToCanvas() {
        var position = new Cesium.Cartesian3.fromDegrees(118.7975, 32.01706, 0)
        this.textCanvas = Cesium.writeTextToCanvas('文字贴图', {
            font: '900px sans-serif',
            fillColor: Cesium.Color.RED
        })
        var dimensions = new Cesium.Cartesian3(this.textCanvas.width * 100, this.textCanvas.height * 100, 10.0);
        var scaleM = Cesium.Matrix4.fromScale(dimensions);
        this.M = Cesium.Transforms.eastNorthUpToFixedFrame(position)
        var quaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, Cesium.Math.toRadians(90)); // 绕Z轴旋转-90度
        var quaternion2 = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_X, Cesium.Math.toRadians(0)); // 绕Y轴旋转45度
        var combinedQuaternion = Cesium.Quaternion.multiply(quaternion, quaternion2, new Cesium.Quaternion());
        var rotation = new Cesium.Matrix3();
        Cesium.Matrix3.fromQuaternion(combinedQuaternion, rotation);
        Cesium.Matrix4.multiplyByMatrix3(this.M, rotation, this.M);
        Cesium.Matrix4.multiply(this.M, scaleM, this.M)
    }
    //添加图元
    addPrimitive(viewer) {
        var primitive = new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: Cesium.PlaneGeometry.createGeometry(
                    new Cesium.PlaneGeometry({
                        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
                    })
                ),
                modelMatrix: this.M
            }),
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                material: Cesium.Material.fromType('Image', {
                    image: this.textCanvas,
                    repeat: new Cesium.Cartesian2(1, 1)//贴图是否重复
                }),
                flat: true,//指示外观是否为平面
                aboveGround: true,//指示外观是否显示在地球表面之上
            }),
            asynchronous: false,
        })
        viewer.scene.primitives.add(primitive)
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(118.7975, 32.01706, 500000),
            orientation: {
                heading: Cesium.Math.toRadians(1.191094628042772),
                pitch: -Cesium.Math.PI_OVER_TWO,
                roll: Cesium.Math.toRadians(0.0000029411615960484028)
            },
        })
    }

    //数据清除
    removeData(viewer) {
        viewer.scene.primitives.removeAll()
    }


}
export default LoadByPrimitive