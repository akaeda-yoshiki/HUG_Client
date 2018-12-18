//四角形クラス
function figure(id, type, place, stats, color, label_color, label_text) {
    this.id = id;
    this.type = type;
    this.place = place
    this.stats = stats;
    this.color = color;
    this.label_color = label_color;
    this.label_text = label_text;
}



//画像関係の初期化処理
function figure_init() {
    create_triangle();
    draw_figure();//図形の描画
}

//四角形の新規作成、更新
function create_rect() {
    var place = [20, 20, 100, 100];
    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.6;
    var get = document.getElementById("create_figure");

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
        figure_info.push(new figure(0, TYPE.RECT, place, FIGURE.NULL, color, label_color, get.label_text.value));

    var get = document.getElementById("create_figure");
    get.figure_color.value = "#00ff00";
    get.label_text.value = "";
    get.label_color.value = "#ff0000";
    myedit = -1;
    get = document.getElementById("select_figure");
    get.figure.value = "no";

}

//円を新規作成、編集
function create_circle() {
    var place = [50, 50, 50];
    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.6;
    var get = document.getElementById("create_figure");

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
console.log("円編集");
    }
    else//新規作成
        figure_info.push(new figure(0, TYPE.CIRCLE, place, FIGURE.NULL, color, label_color, get.label_text.value));

    var get = document.getElementById("create_figure");
    get.figure_color.value = "#00ff00";
    get.label_text.value = "";
    get.label_color.value = "#ff0000";
    myedit = -1;
    get = document.getElementById("select_figure");
    get.figure.value = "no";

}

//三角形を作成、編集
function create_triangle() {
    var place = [80, 20, -50, 80, 50, 80];

    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.6;
    var get = document.getElementById("create_figure");

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
        figure_info.push(new figure(0, TYPE.TRIANGLE, place, FIGURE.NULL, color, label_color, get.label_text.value));

    var get = document.getElementById("create_figure");
    get.figure_color.value = "#00ff00";
    get.label_text.value = "";
    get.label_color.value = "#ff0000";
    myedit = -1;
    get = document.getElementById("select_figure");
    get.figure.value = "no";

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
    // console.log(figure_info);
    console.log(myedit);
    // console.log(cross_product(100, 500, 100, 300, imag_mousex, imag_mousey));
    for (var i = 0; i < figure_info.length; i++) {
        var place = figure_info[i].place;
        var label_place = place.slice();
        // console.log(label_place + "::" + place);
        figure_ctx.fillStyle = figure_info[i].color;

        switch (figure_info[i].type) {
            case TYPE.RECT:
                figure_ctx.fillRect(place[0], place[1], place[2], place[3]);
                if (i == myedit) {//選択図形の輪郭を変化
                    figure_ctx.strokeRect(place[0], place[1], place[2], place[3]);
                }

                break;

            case TYPE.CIRCLE:
                figure_ctx.beginPath();
                figure_ctx.arc(place[0], place[1], place[2], 0, Math.PI * 2, false);
                figure_ctx.fill();
                if (i == myedit) {//選択図形の輪郭を変化
                    figure_ctx.stroke();
                }
                label_place.push(place[2] * 2);
                label_place[0] = place[0] - place[2] * 0.8;
                label_place[1] = place[1] - place[2] * 0.7;

                break;
            case TYPE.TRIANGLE:
                figure_ctx.beginPath();
                figure_ctx.moveTo(place[0], place[1]); //最初の点の場所
                figure_ctx.lineTo(place[0] + place[2], place[1] + place[3]); //2番目の点の場所
                figure_ctx.lineTo(place[0] + place[4], place[1] + place[5]); //3番目の点の場所

                figure_ctx.closePath();	//三角形の最後の線 closeさせる
                figure_ctx.fill();
                if (i == myedit) {//選択図形の輪郭を変化
                    figure_ctx.stroke();
                }
                label_place[0] = place[0] - 20;
                label_place[1] = place[1] + 30;
                label_place[2] = Math.abs(place[2] - place[0]);



                break;
        }
        if (label_place[3] > LAVEL_SIZE_MAX_Y)//ラベルの縦幅の上限
            label_place[3] = LAVEL_SIZE_MAX_Y;
        if (label_place[2] > figure_info[i].label_text.length * 15)
            label_place[2] = figure_info[i].label_text.length * 15 + 20;
        label_draw(label_place, i);
    }
    //図形の拡大縮小可能時のマーカー
    figure_ctx.fillStyle = size_change_marker.color;
    figure_ctx.fillRect(size_change_marker.place.x, size_change_marker.place.y, size_change_marker.place.width, size_change_marker.place.height);

}

//四角形を描画
function rect_draw(place, i) {
    figure_ctx.fillRect(place[0], place[1], place[2], place[3]);
    if (i == myedit) {//選択図形の輪郭を変化
        figure_ctx.strokeRect(place[0], place[1], place[2], place[3]);

    }
}

//ラベルの描画
function label_draw(place, i) {
    figure_ctx.fillStyle = figure_info[i].label_color;
    var label_place = [place[0] + place[2] * 0.1, place[1] + place[2] * 0.1, place[2] * 0.8, place[3] * 0.3];
    figure_ctx.fillRect(label_place[0], label_place[1], label_place[2], label_place[3]);

    figure_ctx.textBaseline = "top";
    figure_ctx.font = "15px 'ＭＳ ゴシック'";
    figure_ctx.fillStyle = "black";
    figure_ctx.textAlign = 'center';
    figure_ctx.textBaseline = 'middle';
    figure_ctx.fillText(figure_info[i].label_text, label_place[0] + label_place[2] / 2, label_place[1] + label_place[3] / 2, label_place[2]);

}

//画像上をクリア
function clear_figure() {

    figure_ctx.clearRect(0, 0, canvas.width, canvas.height);
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

function place_judge(i) {
    switch (figure_info[i].type) {
        case TYPE.RECT:
            return rect_judge(figure_info[i].place[0], figure_info[i].place[2], figure_info[i].place[1], figure_info[i].place[3], imag_mousex, imag_mousey);
        case TYPE.CIRCLE:
            if (circle_judge(figure_info[i].place[0], figure_info[i].place[1], 0, figure_info[i].place[2], imag_mousex, imag_mousey))
                return true;
            break;
        case TYPE.TRIANGLE:
            return triangle_judge(figure_info[i].placem, i);
    }
    return false;
}

//三角形の内部にあるかどうか
function triangle_judge(place, i) {
    var h1 = cross_product(figure_info[i].place[0], figure_info[i].place[1], figure_info[i].place[0] + figure_info[i].place[2], figure_info[i].place[1] + figure_info[i].place[3], imag_mousex, imag_mousey);
    var h2 = cross_product(figure_info[i].place[0] + figure_info[i].place[2], figure_info[i].place[1] + figure_info[i].place[3], figure_info[i].place[0] + figure_info[i].place[4], figure_info[i].place[1] + figure_info[i].place[5], imag_mousex, imag_mousey);
    var h3 = cross_product(figure_info[i].place[0] + figure_info[i].place[4], figure_info[i].place[1] + figure_info[i].place[5], figure_info[i].place[0], figure_info[i].place[1], imag_mousex, imag_mousey);
    if (h1 <= 0 && h2 <= 0 && h3 <= 0)
        return true;
    return false;
}

//引数の範囲に座標が含まれているかを判定
function rect_judge(x, x_range, y, y_range, plascex, placey) {
    if (x < plascex && x + x_range > plascex && y < placey && y + y_range > placey) {
        return true;
    }
    return false;
}

//中心から範囲内に含まれているか
function circle_judge(x, y, range_min, range_max, placex, placey) {
    if (range_max >= Math.hypot(x - placex, y - placey) && range_min <= Math.hypot(x - placex, y - placey))
        return true;
    return false;
}

//外積の計算結果を返す(正：右)
function cross_product(start_x, start_y, line_x, line_y, place_x, place_y) {
    var vector1 = [line_x - start_x, line_y - start_y];
    var vector2 = [place_x - start_x, place_y - start_y];

    return (vector1[0] * vector2[1]) - (vector2[0] * vector1[1]);
}

//マウス共に拡大縮小マーカーを移動
function size_change_marker_move() {
    size_change_marker.place.x = -10;
    size_change_marker.place.y = -10;

    switch (figure_info[myedit].type) {
        case TYPE.RECT:
            rect_size_change_marker_move();
            break;
        case TYPE.CIRCLE:
            if (circle_judge(figure_info[myedit].place[0], figure_info[myedit].place[1], figure_info[myedit].place[2] - CIRCLE_MARKER_RANGE, figure_info[myedit].place[2], imag_mousex, imag_mousey)) {
                size_change_marker.place.x = imag_mousex;
                size_change_marker.place.y = imag_mousey;
            }
            size_change_marker.color = "blue";
            break;
        case TYPE.TRIANGLE:
            // if (place_judge(myedit)) {
            if (circle_judge(figure_info[myedit].place[0], figure_info[myedit].place[1], 0, TRIANGLE_POINT_RNGE, imag_mousex, imag_mousey)) {
                size_change_marker.place.x = figure_info[myedit].place[0] - size_change_marker.place.width / 2;
                size_change_marker.place.y = figure_info[myedit].place[1] - size_change_marker.place.height / 2;
                change_flag = 1;
            }
            if (circle_judge(figure_info[myedit].place[0] + figure_info[myedit].place[2], figure_info[myedit].place[1] + figure_info[myedit].place[3], 0, TRIANGLE_POINT_RNGE, imag_mousex, imag_mousey)) {
                size_change_marker.place.x = figure_info[myedit].place[0] + figure_info[myedit].place[2] - size_change_marker.place.width / 2;
                size_change_marker.place.y = figure_info[myedit].place[1] + figure_info[myedit].place[3] - size_change_marker.place.height / 2;
                change_flag = 2;
            }
            if (circle_judge(figure_info[myedit].place[0] + figure_info[myedit].place[4], figure_info[myedit].place[1] + figure_info[myedit].place[5], 0, TRIANGLE_POINT_RNGE, imag_mousex, imag_mousey)) {
                size_change_marker.place.x = figure_info[myedit].place[0] + figure_info[myedit].place[4] - size_change_marker.place.width / 2;
                size_change_marker.place.y = figure_info[myedit].place[1] + figure_info[myedit].place[5] - size_change_marker.place.height / 2;
                change_flag = 3;
            }
            size_change_marker.color = "red";
            // }
            break;

    }
}



//四角形の拡大縮小
function size_change() {

    // console.log(Math.floor(change_flag % 10));

    switch (figure_info[myedit].type) {
        case TYPE.RECT:
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
            } break;
        case TYPE.CIRCLE:
            figure_info[myedit].place[2] = Math.hypot(figure_info[myedit].place[0] - imag_mousex, figure_info[myedit].place[1] - imag_mousey);

            break;
        case TYPE.TRIANGLE:
            if (change_flag == 1) {
                figure_info[myedit].place[2] += figure_info[myedit].place[0] - imag_mousex;
                figure_info[myedit].place[3] += figure_info[myedit].place[1] - imag_mousey;
                figure_info[myedit].place[4] += figure_info[myedit].place[0] - imag_mousex;
                figure_info[myedit].place[5] += figure_info[myedit].place[1] - imag_mousey;
                figure_info[myedit].place[0] = imag_mousex;
                figure_info[myedit].place[1] = imag_mousey;
            }
            if (change_flag == 2) {
                figure_info[myedit].place[2] = imag_mousex - figure_info[myedit].place[0];
                figure_info[myedit].place[3] = imag_mousey - figure_info[myedit].place[1];
            }
            if (change_flag == 3) {
                figure_info[myedit].place[4] = imag_mousex - figure_info[myedit].place[0];
                figure_info[myedit].place[5] = imag_mousey - figure_info[myedit].place[1];
            }
            break;

    }



}

//四角形の拡大縮小マーカーを移動
function rect_size_change_marker_move() {
    var cnt = 0;

    if (rect_judge(figure_info[myedit].place[0], RECT_MARKER_RANGE, figure_info[myedit].place[1], figure_info[myedit].place[3], imag_mousex, imag_mousey)) {
        size_change_marker.place.x = figure_info[myedit].place[0] - RECT_MARKER_RANGE / 2;
        size_change_marker.place.y = imag_mousey;
        cnt++;
    }
    if (rect_judge(figure_info[myedit].place[0] + figure_info[myedit].place[2] - RECT_MARKER_RANGE, RECT_MARKER_RANGE, figure_info[myedit].place[1], figure_info[myedit].place[3], imag_mousex, imag_mousey)) {
        size_change_marker.place.x = figure_info[myedit].place[0] + figure_info[myedit].place[2] - RECT_MARKER_RANGE / 2;
        size_change_marker.place.y = imag_mousey;
        cnt += 2;
    }
    if (rect_judge(figure_info[myedit].place[0], figure_info[myedit].place[2], figure_info[myedit].place[1], RECT_MARKER_RANGE, imag_mousex, imag_mousey)) {
        size_change_marker.place.x = imag_mousex;
        size_change_marker.place.y = figure_info[myedit].place[1] - RECT_MARKER_RANGE / 2;
        cnt += 10;
    }
    if (rect_judge(figure_info[myedit].place[0], figure_info[myedit].place[2], figure_info[myedit].place[1] + figure_info[myedit].place[3] - RECT_MARKER_RANGE, RECT_MARKER_RANGE, imag_mousex, imag_mousey)) {
        size_change_marker.place.x = imag_mousex;
        size_change_marker.place.y = figure_info[myedit].place[1] + figure_info[myedit].place[3] - RECT_MARKER_RANGE / 2;
        cnt += 20;
    }
    if (cnt % 10 > 0 && Math.floor(cnt / 10) > 0) {
        size_change_marker.color = "red";
        if (cnt % 10 == 1)
            size_change_marker.place.x = figure_info[myedit].place[0] - RECT_MARKER_RANGE / 2;
        else
            size_change_marker.place.x = figure_info[myedit].place[0] + figure_info[myedit].place[2] - RECT_MARKER_RANGE / 2;
    }
    else
        size_change_marker.color = "blue";
}

//拡大縮小するかの判定
function size_change_flag() {

    var place = figure_info[myedit].place;

    switch (figure_info[myedit].type) {
        case TYPE.RECT:
            if (rect_judge(place[0], RECT_MARKER_RANGE, place[1], place[3], imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                change_flag += 1;
            }
            if (rect_judge(place[0] + place[2] - RECT_MARKER_RANGE, RECT_MARKER_RANGE, place[1], place[3], imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                change_flag += 2;
            }
            if (rect_judge(place[0], place[2], place[1], RECT_MARKER_RANGE, imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                change_flag += 10;
            }
            if (rect_judge(place[0], place[2], place[1] + place[3] - RECT_MARKER_RANGE, RECT_MARKER_RANGE, imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                change_flag += 20;
            }

            break;
        case TYPE.CIRCLE:
            if (circle_judge(place[0], place[1], place[2] - CIRCLE_MARKER_RANGE, place[2], imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                return 1;
            }
            break;
        case TYPE.TRIANGLE:
            if (circle_judge(place[0], place[1], 0, TRIANGLE_POINT_RNGE, imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                return 1;
            }
            if (circle_judge(place[0] + place[2], place[1] + place[3], 0, TRIANGLE_POINT_RNGE, imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                return 1;
            }
            if (circle_judge(place[0] + place[4], place[1] + place[5], 0, TRIANGLE_POINT_RNGE, imag_mousex, imag_mousey)) {
                figure_info[myedit].stats = FIGURE.CHANGE;
                return 1;

            }

            break;

    }
    if (change_flag != 0)
        return 1;

    return 0;
}


