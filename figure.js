//四角形クラス
function rect(id, type, place, stats, color, label_color, label_text, ctx) {
    this.id = id;
    this.type = type;
    this.place = place
    this.stats = stats;
    this.color = color;
    this.label_color = label_color;
    this.label_text = label_text;
    this.ctx = ctx;
}

//画像関係の初期化処理
function figure_init(){
    draw_figure();//図形の描画
}
function figure_mousedown(){
    
}


//四角形の新規作成、更新
function create_rect() {
    var place = [20, 20, 100, 100];
    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.6;
    var get = document.forms[0];

    //図形の色　　16進数から変換
    var get_color = get.figure_color.value;
    var r = parseInt(get_color.substr(1, 2), 16).toString(10);
    var g = parseInt(get_color.substr(3, 2), 16).toString(10);
    var b = parseInt(get_color.substr(5, 2), 16).toString(10);
    var color = "rgb(" + r + "," + g + "," + b + ")";
    //ラベルの色　　16進数から変換
    get_color = get.label_color.value;
    r = parseInt(get_color.substr(1, 2), 16).toString(10);
    g = parseInt(get_color.substr(3, 2), 16).toString(10);
    b = parseInt(get_color.substr(5, 2), 16).toString(10);
    var label_color = "rgb(" + r + "," + g + "," + b + ")";

    if (myedit != -1) {//編集中なら更新
        figure_info[myedit].color = color;
        figure_info[myedit].label_color = label_color;
        figure_info[myedit].label_text = get.label_text.value;
    }
    else//新規作成
        figure_info.push(new rect(0, TYPE.RECT, place, FIGURE.NULL, color, label_color, get.label_text.value, ctx));

    var get = document.forms[0];
    get.figure_color.value = "#00ff00";
    get.label_text.value = "";
    get.label_color.value = "#ff0000";

}

//選択している図形の削除
function figure_delete() {
    if (myedit != -1) {
        figure_info.splice(myedit, 1);
        myedit = -1;
    }
}



//図形の描画
function draw_figure() {

    for (var i = 0; i < figure_info.length; i++) {
        var place = figure_info[i].place;
        figure_info[i].ctx.fillStyle = figure_info[i].color;
        figure_info[i].ctx.fillRect(place[0], place[1], place[2], place[3]);
        if (i == myedit) {//選択図形の輪郭を変化
            figure_info[i].ctx.strokeRect(place[0], place[1], place[2], place[3]);

        }
        figure_info[i].ctx.fillStyle = figure_info[i].label_color;
        var label_place = [place[0] + place[2] * 0.1, place[1] + place[2] * 0.1, place[2] * 0.8, place[3] * 0.3];
        figure_info[i].ctx.fillRect(label_place[0], label_place[1], label_place[2], label_place[3]);

        figure_info[i].ctx.textBaseline = "top";
        figure_info[i].ctx.font = "15px 'ＭＳ ゴシック'";
        figure_info[i].ctx.fillStyle = "black";
        figure_info[i].ctx.textAlign = 'center';
        figure_info[i].ctx.textBaseline = 'middle';
        figure_info[i].ctx.fillText(figure_info[i].label_text, label_place[0] + label_place[2] / 2, label_place[1] + label_place[3] / 2, label_place[2]);
    }
    //図形の拡大縮小可能時のマーカー
    size_change_marker.ctx.fillStyle = size_change_marker.color;
    size_change_marker.ctx.fillRect(size_change_marker.place.x, size_change_marker.place.y, size_change_marker.place.width, size_change_marker.place.height);

}

//画像上をクリア
function clear_figure() {

    size_change_marker.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//rgb( , , )から16進数に変換
function rgb_to_16(rgb) {
    var r = parseInt(rgb[0].substr(4), 10).toString(16);
    if (r.length == 1)
        r = "0" + r;
    var g = parseInt(rgb[1], 10).toString(16);
    if (g.length == 1)
        g = "0" + g;
    var b = parseInt(rgb[2].substr(0, rgb[2].length - 1), 10).toString(16);
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
}

//引数の範囲に座標が含まれているかを判定
function place_judge(x, x_range, y, y_range, plascex, placey) {
    if (x < plascex && x + x_range > plascex && y < placey && y + y_range > placey) {
        return true;
    }
    return false;
}

//マウス共に拡大縮小マーカーを移動
function size_change_marker_move() {
    size_change_marker.place.x = -10;
    size_change_marker.place.y = -10;
    var cnt = 0;

    if (place_judge(figure_info[myedit].place[0], MARKER_RANGE, figure_info[myedit].place[1], figure_info[myedit].place[3], imag_mousex, imag_mousey)) {
        size_change_marker.place.x = figure_info[myedit].place[0] - MARKER_RANGE / 2;
        size_change_marker.place.y = imag_mousey;
        cnt++;
    }
    if (place_judge(figure_info[myedit].place[0] + figure_info[myedit].place[2] - MARKER_RANGE, MARKER_RANGE, figure_info[myedit].place[1], figure_info[myedit].place[3], imag_mousex, imag_mousey)) {
        size_change_marker.place.x = figure_info[myedit].place[0] + figure_info[myedit].place[2] - MARKER_RANGE / 2;
        size_change_marker.place.y = imag_mousey;
        cnt += 2;
    }
    if (place_judge(figure_info[myedit].place[0], figure_info[myedit].place[2], figure_info[myedit].place[1], MARKER_RANGE, imag_mousex, imag_mousey)) {
        size_change_marker.place.x = imag_mousex;
        size_change_marker.place.y = figure_info[myedit].place[1] - MARKER_RANGE / 2;
        cnt += 10;
    }
    if (place_judge(figure_info[myedit].place[0], figure_info[myedit].place[2], figure_info[myedit].place[1] + figure_info[myedit].place[3] - MARKER_RANGE, MARKER_RANGE, imag_mousex, imag_mousey)) {
        size_change_marker.place.x = imag_mousex;
        size_change_marker.place.y = figure_info[myedit].place[1] + figure_info[myedit].place[3] - MARKER_RANGE / 2;
        cnt += 20;
    }
    if (cnt % 10 > 0 && Math.floor(cnt / 10) > 0) {
        size_change_marker.color = "red";
        if (cnt % 10 == 1)
            size_change_marker.place.x = figure_info[myedit].place[0] - MARKER_RANGE / 2;
        else
            size_change_marker.place.x = figure_info[myedit].place[0] + figure_info[myedit].place[2] - MARKER_RANGE / 2;

        // size_change_marker.place.y = -10;

    }
    else
        size_change_marker.color = "blue";
}

//四角形のどの方向に拡大縮小するかの判定
function size_change_flag() {

    if (place_judge(figure_info[myedit].place[0], MARKER_RANGE, figure_info[myedit].place[1], figure_info[myedit].place[3], imag_mousex, imag_mousey)) {
        figure_info[myedit].stats = FIGURE.CHANGE;
        change_flag += 1;
    }
    if (place_judge(figure_info[myedit].place[0] + figure_info[myedit].place[2] - MARKER_RANGE, MARKER_RANGE, figure_info[myedit].place[1], figure_info[myedit].place[3], imag_mousex, imag_mousey)) {
        figure_info[myedit].stats = FIGURE.CHANGE;
        change_flag += 2;
    }
    if (place_judge(figure_info[myedit].place[0], figure_info[myedit].place[2], figure_info[myedit].place[1], MARKER_RANGE, imag_mousex, imag_mousey)) {
        figure_info[myedit].stats = FIGURE.CHANGE;
        change_flag += 10;
    }
    if (place_judge(figure_info[myedit].place[0], figure_info[myedit].place[2], figure_info[myedit].place[1] + figure_info[myedit].place[3] - MARKER_RANGE, MARKER_RANGE, imag_mousex, imag_mousey)) {
        figure_info[myedit].stats = FIGURE.CHANGE;
        change_flag += 20;
    }

    if (change_flag != 0)
        return 1;
    return 0;
}


//四角形の拡大縮小
function size_change() {



    // console.log(Math.floor(change_flag % 10));
    if (change_flag % 10 == 1) {
        figure_info[myedit].place[2] += figure_info[myedit].place[0] - imag_mousex;
        figure_info[myedit].place[0] = imag_mousex;
    }
    else if (change_flag % 10 == 2) {
        figure_info[myedit].place[2] = imag_mousex - figure_info[myedit].place[0];
    }
    if (Math.floor(change_flag / 10) == 1) {
        figure_info[myedit].place[3] += figure_info[myedit].place[1] - imag_mousey;
        figure_info[myedit].place[1] = imag_mousey;
    }
    else if (Math.floor(change_flag / 10) == 2) {
        figure_info[myedit].place[3] = imag_mousey - figure_info[myedit].place[1];
    }




}

