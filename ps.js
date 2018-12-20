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
                // if (debug == true)
                //         recieve();
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
                        if (figure_info[i].type != TYPE.DELETE)
                                //図形の上にマウスがあるか判定
                                if (place_judge(i)) {
                                        console.log(i + "**" + figure_info[i].num);
                                        myedit = i;
                                        var get = document.getElementById("select_figure");
                                        get.figure.value = figure_info[i].type;
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
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"]),
                        id: 5
                },
                success: function (data) {
                        // alert(data);
                        figure_info_pre = figure_info;
                        figure_info = [];
                        for (let i = 0; i < data.length; i++) {

                                var place = data[i].data3.split("_");
                                for (var j = 0; j < place.length; j++) {
                                        place[j] = Number(place[j]);
                                }
                                var color = data[i].data4.split("_");
                                figure_info.push(new figure(data[i].data1, place, FIGURE.NULL, color[0], color[1], data[i].data5, data[i].data2));
                        }
                        console.log(figure_info_pre);
                        console.log(figure_info);

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        // alert('エラーです！' + textStatus); //エラーを表示
                }
        });
        myedit = -1;
        var ctx = canvas.getContext("2d");
        ctx.globalAlpha = 0.6;
        clear_figure();
        draw_figure();
        
}

//図形情報の送信
function send(i) {

        if (figure_info[i].num == "-1") {
                $.ajax({ //非同期通信
                        type: "POST",
                        url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                        data: {
                                data1: figure_info[i].type,
                                data2: figure_info[i].num,
                                data3: figure_info[i].place.join("_"),
                                data4: figure_info[i].color + "_" + figure_info[i].label_color,
                                data5: figure_info[i].label_text,
                                code: window.sessionStorage.getItem(["eventcode"]),
                                mode: "insert",
                                id: 5
                        },
                        success: function (data) {
                                if (i != figure_info.length - 1)
                                        send(i + 1);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                // alert('エラーです！' + textStatus); //エラーを表示
                        }
                });
        }
        else {
                if (i != figure_info.length - 1)
                        send(i + 1);
        }
        //         $.ajax({ //非同期通信
        //                 type: "POST",
        //                 url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
        //                 data: {
        //                         data1: figure_info[i].type,
        //                         data2: figure_info[i].num,
        //                         data3: figure_info[i].place.join("_"),
        //                         data4: figure_info[i].color + "_" + figure_info[i].label_color,
        //                         data5: figure_info[i].label_text,
        //                         code: window.sessionStorage.getItem(["eventcode"]),
        //                         mode: "insert",
        //                         id: 5
        //                 },
        //                 success: function (data) {
        //                         if (i != figure_info.length - 1)
        //                                 send(i + 1);
        //                 },
        //                 error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
        //                         // alert('エラーです！' + textStatus); //エラーを表示
        //                 }
        //         });
}

function create_figure() {
        var get = document.getElementById("select_figure");
        // console.log(get.figure.value);
        // var get = document.forms.select_figure;
        // switch (figure_info[myedit].type) {
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

function edit_figure() {
        document.getElementById('select_figure').figure.value = figure_info[myedit].type;

        create_figure();
}