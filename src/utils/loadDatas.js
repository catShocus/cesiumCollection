/**
 * @brief 实现Cesium1.98各种数据加载的方法类
 * @param {String} url gltf的地址
 */
import * as Cesium from 'cesium'
class LoadData {
    //构造函数
    constructor(viewer) {
        this.viewer = viewer;
        this.model = null
    }
    //gltf数据加载
    addGltfModel(url) {
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
        this.viewer.scene.primitives.add(this.model)

        //模型初始加载时，去掉水面模型
        this.model.readyPromise.then(() => {

        })


        //相机视角漫游
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(118.79571071071288, 32.0165083628853, 43.939026369824354),
            orientation: {
                heading: 1.191094628042772,
                pitch: -0.14150746498186884,
                roll: 0.0000029411615960484028
            },
        })
        return this.model
    }

    //数据清除
    removeGltfData() {
        this.viewer.scene.primitives.remove(this.model)
        this.viewer.camera.flyHome(1)
    }
}
export default LoadData