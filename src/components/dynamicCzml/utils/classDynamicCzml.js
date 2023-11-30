/**
 * @brief 动态Czml类
 */
import * as Cesium from 'cesium'
import { czml } from '../data/czml'
class DynamicCzml {
    constructor() {
        this.czmlInterval = null
    }

    rstCzml(viewer) {
        let dataSourcePromise;
        let i = 30.957024;
        let a = 60;
        this.czmlInterval = setInterval(() => {
            i += 0.0001;
            a += 10;
            czml[1].position.cartographicDegrees.push(a, 118.8747338, i, 0);
            czml[0].clock.currentTime = viewer.clock.currentTime.toString();
            viewer.entities.removeAll();
            viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
        }, 1000);
        dataSourcePromise = Cesium.CzmlDataSource.load(czml);
        viewer.dataSources.add(dataSourcePromise);
        viewer.zoomTo(dataSourcePromise);
    }
    //开始动态
    startDynamic(viewer) {
        this.rstCzml(viewer)
    }
    //停止动态
    stopDynamic(viewer) {

    }

    //清除销毁
    clearDatas(viewer) {
        viewer.dataSources.removeAll()
    }
}
export default DynamicCzml