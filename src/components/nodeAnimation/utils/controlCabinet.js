/**
 * @brief 柜门开关动画
 * @param {Object} viewer Cesium中一切API的起源
 * @param {Object} model 加载glb后返回的模型对象
 * @param {Array} cabinetArr 柜门动画节点数据
 */
import * as Cesium from 'cesium'
class ControlCabinet {
    constructor(viewer) {
        this.viewer = viewer
        this.handler = null
    }

    //打开柜门
    openCabinet(model, cabinetArr) {
        this.handler = this.viewer.screenSpaceEventHandler
        this.handler.setInputAction((event) => {
            const pickedObject = this.viewer.scene.pick(event.position);
            if (
                Cesium.defined(pickedObject) &&
                Cesium.defined(pickedObject.detail.node)
            ) {
                const nodeName = pickedObject.detail.node._name;
                const node = model.getNode(nodeName);
                /* 实现特定节点方才添加动画 */
                //柜门
                let currentNode = cabinetArr.find((item) => {
                    return item.cabinetName === node.name
                })
                //点击对应节点，对应节点的动画运行
                if (node && currentNode.cabinetName && currentNode.close === true) {
                    currentNode.close = false;
                    currentNode.animationName.forEach((item) => {
                        // debugger
                        model.activeAnimations.add({
                            name: item,
                            multiplier: 1,
                            loop: Cesium.ModelAnimationLoop.NONE,
                        })
                    })
                }

            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    //关闭柜门
    closeCabinet(model, cabinetArr) {
        this.handler.setInputAction((event) => {
            const pickedObject = this.viewer.scene.pick(event.position);
            if (
                Cesium.defined(pickedObject) &&
                Cesium.defined(pickedObject.detail.node)
            ) {
                const nodeName = pickedObject.detail.node._name;
                const node = model.getNode(nodeName);
                /* 实现特定节点方才添加动画 */
                //柜门
                let currentNode = cabinetArr.find((item) => {
                    return item.cabinetName === node.name
                })
                //点击对应节点，对应节点的动画运行
                if (node && currentNode.cabinetName && currentNode.close === false) {
                    currentNode.close = true;
                    currentNode.animationName.forEach((item) => {
                        model.activeAnimations.add({
                            reverse: true,
                            name: item,
                            multiplier: 1,
                            loop: Cesium.ModelAnimationLoop.NONE,
                        })

                    })
                }
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    //点击事件解绑
    destroyHandler() {
        this.handler && this.handler.destroy()
    }
}
export default ControlCabinet