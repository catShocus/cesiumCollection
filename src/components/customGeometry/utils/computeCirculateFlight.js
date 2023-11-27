class ComputeCirculate {
    computeCirculateFlight(lon, lat, radius) {
        let Ea = 6378137; //赤道半径
        let Eb = 635725; //极半径
        let positionArr = [];
        positionArr.push(lon);
        positionArr.push(lat);
        //需求正北是0° Cesium正东是0°
        for (let i = 0; i <= 90; i++) {
            //计算距离原点半径为radius的点的x和y方向上的偏移量
            let dx = radius * Math.sin(i * Math.PI / 180.0);
            let dy = radius * Math.cos(i * Math.PI / 180.0);

            let ec = Eb + (Ea - Eb) * (90.0 - lat) / 90.0;
            let ed = ec * Math.cos(lat * Math.PI / 180);

            let BJD = lon + (dx / ed) * 180 / Math.PI;
            let BWD = lat + (dy / ec) * 180.0 / Math.PI;

            positionArr.push(BJD);
            positionArr.push(BWD);
        }
        return positionArr
    }
}

export default ComputeCirculate