/**
 * @brief 自定义材质的动态线
 */
import * as Cesium from 'cesium'
const defaultColor = Cesium.Color.TRANSPARENT;
// const defaultImage = import('../../../assets/images/color.png');
const defaultImageimageW = 40
const defaultAnimation = false
const defaultDuration = 3000;

class ImageLineMaterial {
    constructor(opt, viewer) {
        this.viewer = viewer
        this.opt = Cesium.defaultValue(opt, Cesium.defaultValue.EMPTY_OBJECT)
        this._color = undefined;
        this._colorSubscription = undefined;
        this._backgroundColor = undefined;
        this._backgroundColorSubscription = undefined;
        this._image = undefined;
        this._imageSubscription = undefined;
        this._imageW = undefined;
        this._imageWSubscription = undefined;
        this._animation = undefined;
        this._animationSubscription = undefined;
        this._duration = undefined;
        this._durationSubscription = undefined;
        // 变量初始化
        this.color = opt.color || defaultColor; //颜色
        this.backgroundColor = opt.backgroundColor || defaultColor; //颜色
        this._image = opt.image || defaultImage; //材质图片
        this.imageW = opt.imageW || defaultImageimageW
        this.animation = opt.animation || defaultAnimation
        this.duration = opt.duration || defaultDuration
        this._time = undefined;
    }
}