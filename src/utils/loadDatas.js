/**
 * @brief 实现Cesium1.98各种数据加载的方法类
 * @param {String} url gltf的地址
 */
import * as Cesium from 'cesium'
class LoadData {
    //构造函数
    constructor(viewer) {
        this.viewer = viewer;
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
            scale: 0.95
        })
        this.viewer.scene.primitives.add(this.model)

        //模型初始加载时，去掉水面模型
        this.model.readyPromise.then(() => {
            const waterNode = this.model.getNode('WDMSM001');
            waterNode.show = false
        })

        //相机视角
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(118.797, 32.017, 200),
            orientation: {
                heading: Cesium.Math.toRadians(180),
                pitch: -Cesium.Math.PI_OVER_TWO,
                roll: Cesium.Math.toRadians(160)
            }
        })
    }
}
export default LoadData