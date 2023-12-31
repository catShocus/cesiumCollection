/**
 * @brief 控制闸门
 * @param {Object} viewer Cesium中一切api的起始
 * @param {Object} gateNode 闸门节点
 * @param {Object} hoistNode 柜门节点
 * @param {Boolean} type true闸门开，false闸门关
 * @param {Boolean} behind 控制上扉门的开启关闭
 */
import * as Cesium from 'cesium'
class GateController {
    constructor(viewer, gateNode, hoistNode, ropeNode) {
        this.gateNode = gateNode;
        this.hoistNode = hoistNode;
        this.ropeNode = ropeNode
        this.upDistance = 0.00001;
        this.angle = 0.00001;
        // this.length = 0.9
        this.intervalGate = null;
        this.viewer = viewer;
        this.upHeight = null;

    }
    //控制抬升
    openFrontGateSelf(type, behind) {
        if (this.intervalGate) {
            this.stopOpening()
            console.log(this.intervalGate, '---this.intervalGate')
        }
        if (type == false) {
            this.angle = -0.00001
        } else if (type) {
            this.angle = 0.00001
        }
        if (this.upHeight && this.upDistance > this.upHeight) {
            this.upDistance = 0.1
        }
        this.intervalGate = setInterval(() => {
            this.upHeight = behind ? 0.05 : 0.1;
            if (this.upDistance <= 0 || this.upDistance > this.upHeight) {
                this.stopOpening();
                return;
            }

            let step = type ? 0.01 : -0.01
            this.upDistance += type ? 0.0001 : -0.0001
            this.angle += type ? -0.01 : 0.01;
            // this.length += type ? 0.000001 : -0.0000001
            // let changeAgle = type ? -0.01 : 0.01
            // console.log(this.upDistance, '---this.upDistance')
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
            //缆绳
            // this.ropeNode.matrix = Cesium.Matrix4.multiplyByMatrix3(
            //     this.ropeNode.matrix,
            //     Cesium.Matrix3.fromScale(new Cesium.Cartesian3(1.0, 0.99888, 1.0)),
            //     new Cesium.Matrix4()
            // )
            // this.ropeNode.matrix = Cesium.Matrix4.multiplyTransformation(
            //     this.ropeNode.matrix,
            //     Cesium.Matrix4.fromTranslation(
            //         new Cesium.Cartesian3(0, 0.019, 0)
            //     ),
            //     new Cesium.Matrix4()
            // )


        }, 50);


    }
    stopOpening() {
        clearInterval(this.intervalGate)
        this.intervalGate = null

    }
}
export default GateController
