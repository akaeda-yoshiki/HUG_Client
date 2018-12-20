// var DEBUG = false;
var DEBUG = true;

var LAVEL_SIZE_MAX_Y = 50;//ラベルの縦幅の上限
var RECT_MARKER_RANGE = 8;//拡大縮小可能マーカーの輪郭からの反応幅
var CIRCLE_MARKER_RANGE = 6;//拡大縮小可能マーカーの輪郭からの反応幅
var TRIANGLE_POINT_RNGE = 8;
var ASSESSENT_INPUT_TEXT_NUM = 4;

var FIGURE = {//図形の状態
        NULL: 0,
        MOVE: 1,
        CHANGE: 2,
};
var TYPE = {//図形の型
        RECT: "□",
        CIRCLE: "〇",
        TRIANGLE: "△",
        DELETE: "×"
};

var COLOR16 = {
        GREEN: "#00ff00",
        RED: "#ff0000"
};