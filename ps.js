//初期化処理
function init() {
        setInterval(draw, 100);
        if (debug == true)
                get_user_info();//他のユーザー情報の取得

        // figure_init();//画像関係の初期化処理
}


//マウスが動いた時
function handleMouseMove(e) {
        event = e; // IE対応
        ev = event;
        //画面上のマウスの座標
        mousex = event.clientX;
        mousey = event.clientY;

        //画像上のマウスの座標
        imag_mousex = mousex - canvas.getBoundingClientRect().left;
        imag_mousey = mousey - canvas.getBoundingClientRect().top;

        if (myedit != -1 && figure_info[myedit].stats != FIGURE.MOVE)
                size_change_marker_move();

}


//更新処理
function draw() {
        if (draw_flag) {
                // console.log(mousex + "::" + mousey + "::::::" + figure[mynumber][0] + "~" + (figure[mynumber][0] + x1) + "::" + figure[mynumber][1] + "~" + (figure[mynumber][1] + y1));
                // console.log(myedit);
                window.onmousemove = handleMouseMove;
                if (debug == true)
                        recieve();
                clear_figure();
                if (myedit != -1)
                        switch (figure_info[myedit].stats) {
                                case FIGURE.MOVE://座標の更新
                                        // if (figure_info[myedit].TYPE == TYPE.TRIANGLE) {

                                        // } else {
                                        figure_info[myedit].place[0] = mousex - canvas.getBoundingClientRect().left - rectx;
                                        figure_info[myedit].place[1] = mousey - canvas.getBoundingClientRect().top - recty;
                                        // }
                                        break;
                                case FIGURE.CHANGE:
                                        size_change();
                                        break;
                        }
                draw_figure();//図形の描画

                // size_change_flag();
        }
}

//マウスが押された時
document.onmousedown = function (e) {
        if (!e) e = window.event; // レガシー
        // console.log(canvas.getBoundingClientRect().left + ":" + canvas.getBoundingClientRect().top + ":" + canvas.getBoundingClientRect().width + ":" + canvas.getBoundingClientRect().height + "::::" + mousex + ":" + mousey);
        //画像上にマウスがあるか判定
        if (rect_judge(canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().top, canvas.getBoundingClientRect().height, mousex, mousey))
                for (var i = 0; i < figure_info.length; i++)
                        //図形の上にマウスがあるか判定
                        if (place_judge(i)) {
                                myedit = i;
                                var get = document.getElementById("select_figure");
                                // get.figure.value = figure_info[i].type;
                                get.style.display = "none";
                                $("#create").prop("disabled", true);
                                $("#edit").prop("disabled", false);

                                get = document.getElementById("create_figure");
                                var result = (figure_info[i].color).split(",");
                                get.figure_color.value = rgb_to_16(result);

                                result = (figure_info[i].label_color).split(",");
                                get.label_color.value = rgb_to_16(result);
                                get.label_text.value = figure_info[i].label_text;

                                if (size_change_flag() == 1)
                                        figure_info[myedit].stats = FIGURE.CHANGE;
                                else {
                                        rectx = imag_mousex - figure_info[myedit].place[0];
                                        recty = imag_mousey - figure_info[myedit].place[1];
                                        clear_figure();
                                        // figure_info[myedit].place[0] = mousex - canvas.getBoundingClientRect().left - rectx;
                                        // figure_info[myedit].place[1] = mousey - canvas.getBoundingClientRect().top - recty;

                                        figure_info[myedit].stats = FIGURE.MOVE;
                                        draw_figure();
                                }
                                break;
                        }
                        else {
                                myedit = -1;
                                $("#create").prop("disabled", false);
                                $("#edit").prop("disabled", true);

                                var get = document.getElementById("select_figure");
                                get.style.display = "";
                                get.figure.value = "no";
                                // console.log(get.figure.value);
                                var get = document.getElementById("create_figure");
                                get.figure_color.value = COLOR16.GREEN;
                                get.label_text.value = "";
                                get.label_color.value = COLOR16.RED;

                        }
}

//マウスが離された時
window.onmouseup = function (e) {
        // console.log("離された");
        if (myedit != -1)
                figure_info[myedit].stats = FIGURE.NULL;
        // myedit = -1;
        change_flag = 0;
}

//他のユーザー情報の取得
function get_user_info() {
        $.ajax({
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/read_user.php",
                dataType: "json",
        }).done(function (data, dataType) {
                for (var i = 0; i < data.length; i++) {
                        $("user_info").append("name : " + data[i].name + "&nbsp;" + data[i].role + "<br>");
                }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                // alert('Error : ' + errorThrown);
        });
}

//図形情報の取得
function recieve() {
        $.ajax({
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/read_share.php",
                dataType: "json",
        }).done(function (data, dataType) {
                for (var i = 0; i < data.length; i++) {
                        // if (data[i].number - 1 != mynumber) {
                        //     figure[data[i].number - 1][0] = data[i].data1;
                        //     figure[data[i].number - 1][1] = data[i].data2;
                        //     figure[data[i].number - 1][2] = data[i].data3;
                        //     figure[data[i].number - 1][3] = data[i].data4;

                        // }

                        //色とIDとラベル関係***********************************************************
                        var place = [data[i].data1, data[i].data2, data[i].data3, data[i].data4];
                        figure_info.push(new rect(0, TYPE.RECT, place, FIGURE.NULL, "green", "red", "ラベル", canvas.getContext("2d")));

                }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                // alert('Error : ' + errorThrown);
        });
        clear_figure();
        draw_figure();
}

//図形情報の送信
function send() {
        $.ajax({ //ajaxによる非同期通信発生
                type: "POST", //POST送信でデータを受け渡す
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/share_insert.php",
                data: {
                        //色々変える必要あり***********************************************************
                        info_id: 1,
                        number: sessionStorage.getItem('mynumber'),
                        data1: figure[mynumber][0],
                        data2: figure[mynumber][1],
                        data3: figure[mynumber][2],
                        data4: figure[mynumber][3]
                },
                success: function (hoge) { //接続が成功
                        // alert(hoge);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        // alert(errorThrown); //エラーを表示
                }
        });
        return false;
}

function create_figure() {
        var get = document.getElementById("select_figure");
        // var get = document.forms.select_figure;
        switch (get.figure.value) {
                case TYPE.RECT:
                        create_rect();
                        break;
                case TYPE.CIRCLE:
                        create_circle();

                        break;
                case TYPE.TRIANGLE:
                        create_triangle();
                        break;
        }
}