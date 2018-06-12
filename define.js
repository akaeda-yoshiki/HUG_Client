var LAVEL_SIZE_MAX_Y = 50;//ラベルの縦幅の上限
var RECT_MARKER_RANGE = 8;//拡大縮小可能マーカーの輪郭からの反応幅
var CIRCLE_MARKER_RANGE = 6;//拡大縮小可能マーカーの輪郭からの反応幅

var FIGURE = {//図形の状態
    NULL: 0,
    MOVE: 1,
    CHANGE: 2,
};
var TYPE = {//図形の型
    RECT: 0,
    CIRCLE: 1
};

var COLOR16 = {
    GREEN: "#00ff00",
    RED: "#ff0000"
};