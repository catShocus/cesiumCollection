/**
 * @brief 控制闸门
 */
import * as Cesium from 'cesium'
class GateController {
    constructor(viewer, gateNode, hoistNode) {
        this.gateNode = gateNode;
        this.hoistNode = hoistNode;
        this.upDistance = 0.00001;
        this.angle = 0.0001;
        this.intervalGate = null;
        this.viewer = viewer
    }
    //控制抬升
    openFrontGateSelf(type,behind) {
        if (this.intervalGate) {
            this.stopOpening()
            console.log(this.intervalGate, '---this.intervalGate')
        }
        this.intervalGate = setInterval(() => {
            let upHeight = behind? 0.05 : 0.1 ;
            if (this.upDistance <= 0 || this.upDistance >= upHeight) {
                this.stopOpening();
                return;
            }
            let step = type ? 0.01 : -0.01
            this.upDistance += type ? 0.0001 : -0.0001
            this.angle += type ? -0.01 : 0.01;
            // 上闸门
            this.gateNode.matrix = Cesium.Matrix4.multiplyTransformation(
                this.gateNode.matrix,
                Cesium.Matrix4.fromTranslation(
                    new Cesium.Cartesian3(0, step, 0)
                ),
                new Cesium.Matrix4()
            );

            // 启闭机
            this.hoistNode.matrix = Cesium.Matrix4.multiplyByMatrix3(
                this.hoistNode.matrix,
                Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(`${this.angle}`)),
                new Cesium.Matrix4()
            );
        }, 50);
    }
    stopOpening() {
        clearInterval(this.intervalGate)
        this.intervalGate = null

    }
}
export default GateController
