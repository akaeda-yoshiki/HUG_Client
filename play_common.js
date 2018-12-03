var now_time = "";

//テーマの詳細を受信
function get_theme_detail() {
        if (DEBUG)
                $.ajax({ //イベントコードに対応するテーマIDを受信
                        type: "POST",
                        url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                        data: {
                                code: window.sessionStorage.getItem(["eventcode"])
                        },
                        success: function (data1) {
                                $.ajax({ //テーマの詳細を受信
                                        type: "POST",
                                        url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/theme.php",
                                        data: {
                                                id: data1
                                        },
                                        success: function (data) {
                                                // タイトル
                                                $("#theme_title_text").empty();
                                                $("#theme_title_text").append(data[0].title);
                                                // カテゴリー
                                                $("#theme_category_text").empty();
                                                $("#theme_category_text").append(data[0].category);
                                                //状況
                                                $("#theme_situation_text").empty();
                                                $("#theme_situation_text").append(data[0].situation);
                                                // 評価項目
                                                $("#theme_assessment_text").empty();
                                                $("#theme_assessment_text").append(data[0].assessment0);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment1);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment2);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment3);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment4);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment5);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment6);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment7);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment8);
                                                $("#theme_assessment_text").append("&nbsp;&nbsp;&nbsp;&nbsp;" + data[0].assessment9);
                                                // 日時・時期
                                                $("#theme_time_text").empty();
                                                $("#theme_time_text").append(data[0].time);
                                                // 地域
                                                $("#theme_area_text").empty();
                                                $("#theme_area_text").append(data[0].area);
                                                // 対象者
                                                $("#theme_target_text").empty();
                                                $("#theme_target_text").append(data[0].target);
                                                // ねらい
                                                $("#theme_aim_text").empty();
                                                $("#theme_aim_text").append(data[0].aim);
                                                // 公開の可否
                                                $("#theme_open_text").empty();
                                                $("#theme_open_text").append(data[0].open);
                                                // 画像
                                                $("#theme_image_text").empty();
                                                // $("#image_text").append(data[0].image);
                                                if (data[0].image != "" && data[0].image != null) {
                                                        $("#theme_image_text").append('<img id="aaa" src="http://192.168.0.159/2018grade4/HUG/HUG_Server/image/' + data[0].image + '">');
                                                        $('canvas').css('background', 'url(http://192.168.0.159/2018grade4/HUG/HUG_Server/image/' + data[0].image + ')');
                                                        $('canvas').css('background-size', '100% 100%');
                                                }
                                                receive_flag = 0;
                                        },
                                        error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                                console.log("テーマ詳細エラー");
                                                console.log("XMLHttpRequest::" + XMLHttpRequest);
                                                console.log("textStatus::" + textStatus);
                                                console.log("errorThrown::" + errorThrown);
                                        }
                                });
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                console.log("イベントのテーマIDエラー");
                                console.log("XMLHttpRequest::" + XMLHttpRequest);
                                console.log("textStatus::" + textStatus);
                                console.log("errorThrown::" + errorThrown);
                        }
                });
}

//更新処理（時間、履歴）
function update() {
        get_history();
        get_time();
}

//経過時間を取得
function get_time() {
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/time.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"]),
                        mode: "update"
                },
                success: function (pass_time_data) {
                        // console.log(pass_time_data);
                        var time = "";
                        if (pass_time_data["hour"] != 0)
                                time += pass_time_data["hour"] + "時間";
                        if (pass_time_data["minute"] != 0)
                                time += pass_time_data["minute"] + "分";
                        if (pass_time_data["second"] != 0)
                                time += pass_time_data["second"] + "秒";
                        $("#pass_time").empty();
                        $("#pass_time").append(time);
                        now_time = time;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        console.log("経過時間受信エラー");
                        console.log("XMLHttpRequest::" + XMLHttpRequest);
                        console.log("textStatus::" + textStatus);
                        console.log("errorThrown::" + errorThrown);
                }
        });

}

//履歴データの受信と表示
function get_history() {
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"]),
                        id: "6"
                },
                success: function (data2) {
                        window.location.href = "finish.html";
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        // console.log("ID4データ受信エラー");
                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                        // console.log("textStatus::" + textStatus);
                        // console.log("errorThrown::" + errorThrown);
                }
        });

        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"]),
                        id: "2"
                },
                success: function (data) {
                        $.ajax({ //非同期通信
                                type: "POST",
                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                                data: {
                                        code: window.sessionStorage.getItem(["eventcode"]),
                                        id: "3"
                                },
                                success: function (data1) {
                                        data = data.concat(data1);

                                        $.ajax({ //非同期通信
                                                type: "POST",
                                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                                                data: {
                                                        code: window.sessionStorage.getItem(["eventcode"]),
                                                        id: "4"
                                                },
                                                success: function (data2) {
                                                        data = data.concat(data2);
                                                        adjustment_history(data);
                                                },
                                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                                        // console.log("ID4データ受信エラー");
                                                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                                                        // console.log("textStatus::" + textStatus);
                                                        // console.log("errorThrown::" + errorThrown);
                                                        adjustment_history(data);
                                                }
                                        });
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                        // console.log("ID3データ受信エラー");
                                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                                        // console.log("textStatus::" + textStatus);
                                        // console.log("errorThrown::" + errorThrown);
                                        $.ajax({ //非同期通信
                                                type: "POST",
                                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                                                data: {
                                                        code: window.sessionStorage.getItem(["eventcode"]),
                                                        id: "4"
                                                },
                                                success: function (data2) {
                                                        data = data.concat(data2);
                                                        adjustment_history(data);
                                                },
                                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                                        // console.log("ID4データ受信エラー");
                                                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                                                        // console.log("textStatus::" + textStatus);
                                                        // console.log("errorThrown::" + errorThrown);
                                                        adjustment_history(data);
                                                }
                                        });
                                }
                        });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        // console.log("ID2データ受信エラー");
                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                        // console.log("textStatus::" + textStatus);
                        // console.log("errorThrown::" + errorThrown);
                        $.ajax({ //非同期通信
                                type: "POST",
                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                                data: {
                                        code: window.sessionStorage.getItem(["eventcode"]),
                                        id: "3"
                                },
                                success: function (data1) {
                                        data = data1;
                                        $.ajax({ //非同期通信
                                                type: "POST",
                                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                                                data: {
                                                        code: window.sessionStorage.getItem(["eventcode"]),
                                                        id: "4"
                                                },
                                                success: function (data2) {
                                                        data = data.concat(data2);
                                                        adjustment_history(data);
                                                },
                                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                                        // console.log("ID4データ受信エラー");
                                                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                                                        // console.log("textStatus::" + textStatus);
                                                        // console.log("errorThrown::" + errorThrown);
                                                        adjustment_history(data);
                                                }
                                        });
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                        // console.log("ID3データ受信エラー");
                                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                                        // console.log("textStatus::" + textStatus);
                                        // console.log("errorThrown::" + errorThrown);
                                        $.ajax({ //非同期通信
                                                type: "POST",
                                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                                                data: {
                                                        code: window.sessionStorage.getItem(["eventcode"]),
                                                        id: "4"
                                                },
                                                success: function (data2) {
                                                        adjustment_history(data2);
                                                },
                                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                                        // console.log("ID4データ受信エラー");
                                                        // console.log("XMLHttpRequest::" + XMLHttpRequest);
                                                        // console.log("textStatus::" + textStatus);
                                                        // console.log("errorThrown::" + errorThrown);
                                                }
                                        });
                                }
                        });
                }
        });
}

//履歴データをIDごとに処理
function adjustment_history(data) {
        $("#situation_detail_box_add").empty();
        // $("#reuse_situation_select_add").empty();
        // $("#reuse_human_select_add").empty();
        $("#situation_box_add").empty();
        // var first_human_card_data = 1, first_situation_card_data = 1;

        // ソート
        data.sort(function (a, b) {
                if (Number(a.num) < Number(b.num)) return -1;
                if (Number(a.num) > Number(b.num)) return 1;
                return 0;
        });

        var add = "", class_name, color;
        for (var i = data.length - 1; i > -1; i--) {
                if (data[i].id == "2") {
                        class_name = "block1";
                        color = "#f7fdc4";
                }
                else if (data[i].id == "3") {
                        class_name = "block2";
                        color = "#fff8ef";
                }
                else if (data[i].id == "4") {
                        class_name = "block1";
                        color = "#e0ffff";
                }

                //全ての履歴
                if (i != data.length - 1)
                        add = "<div class='" + class_name + "' style='width:90%;left:4%;font-size: 13px;border:1px solid green;border-top:0px solid green;background: " + color + ";'>";
                else
                        add = "<div class='" + class_name + "' style='width:90%;left:4%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                add += set_history_data(data[i], "all");
                add += "</div> ";
                $("#situation_detail_box_add").append(add);
                // //再利用
                // if (first_human_card_data == 1 && data[i].id == "3") {
                //         add = "<div class='" + class_name + "' style='width:60%;left:7%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                //         first_human_card_data = 0;
                // }
                // else if (first_situation_card_data == 1 && data[i].id == "2") {
                //         add = "<div class='" + class_name + "' style='width:60%;left:7%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                //         first_situation_card_data = 0;
                // }
                // else
                //         add = "<div class='" + class_name + "' style='width:60%;left:7%;font-size: 13px;border:1px solid green;border-top:0px solid green;background: " + color + ";'>";

                // add += set_history_data(data[i], "all");
                // add += '<br><center><input type="button" value="再利用" onclick="reuse_select(' + data[i].num + ')"></center></div >';
                // if (data[i].id == "2")
                //         $("#reuse_situation_select_add").append(add);
                // else if (data[i].id == "3")
                //         $("#reuse_human_select_add").append(add);


                //履歴の一部
                if (i == data.length - 1) {
                        add = "<div class='" + class_name + "' style='width:100%;height:auto;left:-3.5%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                        add += set_history_data(data[i], "part") + "</div > ";
                        $("#situation_box_add").append(add);
                } else if (i > data.length - 6) {
                        add = "<div class='" + class_name + "' style='width:100%;height:auto;left:-3.5%;font-size: 13px;border:1px solid green;border-top:0px solid green;background: " + color + ";'>";
                        add += set_history_data(data[i], "part") + "</div > ";
                        $("#situation_box_add").append(add);
                }

        }
}

//履歴データの書き込み
function set_history_data(data, h) {
        var sentence = "", left = "5px";
        if (data.data4 == "") {
                left = "38px";
        }
        switch (data.id) {
                case "2":
                        sentence += "【状況カード】" + data.data4;

                        if (window.sessionStorage.getItem(["role"]) == "PS") {
                                if (data.data5 == 0)
                                        sentence += '<input type="button" id="cope_' + data.num + '" style="position: relative; left:' + left + ';text-align: right;" value="対応" onclick="new_cope(' + data.num + ')"><br>';
                                else
                                        sentence += '<input type="button" id="cope_' + data.num + '" style="position: relative; left:' + left + ';text-align: right;" value="対応済み" onclick="new_cope(' + data.num + ')"><br>';
                        }
                        else sentence += "<br>";
                        sentence += data.data1;
                        if (data.data3 != "") {
                                var image = '"' + data.data3 + '"';
                                if (h == "all" || h == "trace") {
                                        sentence += "<br>" + "<a href='#!' onclick='exchange_history_image_not_view(" + image + ")' id='" + data.data3 + "_not_view' style='display: none;'class='square_btn'>画像を非表示</a>";
                                        sentence += "<a href='#!' onclick='exchange_history_image_view(" + image + ")' id='" + data.data3 + "_view_all' class='square_btn'>画像を表示</a>";
                                        sentence += '<img src="http://192.168.0.159/2018grade4/HUG/HUG_Server/image/' + data.data3 + '.jpeg" id="' + data.data3 + '" style="display: none;">';
                                } else if (h == "part") {
                                        sentence += "<br>" + "<a href='#!' onclick='exchange_part_history_image_view(" + image + ")' id='" + data.data3 + "_view_part' class='square_btn'>画像を表示</a>";
                                        document.getElementById("history_image_detail_box_img").src = "http://192.168.0.159/2018grade4/HUG/HUG_Server/image/" + data.data3 + ".jpeg";
                                }
                        }

                        break;
                case "3":
                        sentence += "【人間カード】" + data.data4;
                        if (window.sessionStorage.getItem(["role"]) == "PS") {
                                if (data.data5 == 0)
                                        sentence += '<input type="button" id="cope_' + data.num + '" style="position: relative; left:' + left + ';" value="対応" onclick="new_cope(' + data.num + ')"><br>';
                                else
                                        sentence += '<input type="button" id="cope_' + data.num + '" style="position: relative; left:' + left + ';" value="対応済み" onclick="new_cope(' + data.num + ')"><br>';
                        }
                        sentence += data.data3 + "&nbsp;&nbsp;" + data.data2 + "<br>" + data.data1;

                        break;
                case "4":
                        sentence += "【対応】" + data.data4 + "<br>";

                        sentence += data.data1;
                        if (data.data3 != "") {
                                var image = '"' + data.data3 + '"';
                                if (h == "all" || h == "trace") {
                                        sentence += "<br>" + "<a href='#!' onclick='exchange_history_image_not_view(" + image + ")' id='" + data.data3 + "_not_view' style='display: none;'class='square_btn'>画像を非表示</a>";
                                        sentence += "<a href='#!' onclick='exchange_history_image_view(" + image + ")' id='" + data.data3 + "_view_all' class='square_btn'>画像を表示</a>";
                                        sentence += '<img src="http://192.168.0.159/2018grade4/HUG/HUG_Server/image/' + data.data3 + '.jpeg" id="' + data.data3 + '" style="display: none;">';
                                } else if (h == "part") {
                                        sentence += "<br>" + "<a href='#!' onclick='exchange_part_history_image_view(" + image + ")' id='" + data.data3 + "_view_part' class='square_btn'>画像を表示</a>";
                                        document.getElementById("history_image_detail_box_img").src = "http://192.168.0.159/2018grade4/HUG/HUG_Server/image/" + data.data3 + ".jpeg";
                                }
                        }

                        break;
        }
        if (h != "trace")
                sentence += "<br><a href='#!' onclick='trace_history(" + data.num + ")' class='square_btn'>たどる</a>";
        return sentence;
}

//履歴上にある画像の表示
function exchange_history_image_view(image_id) {
        document.getElementById(image_id + "_view_all").style.display = "none";
        document.getElementById(image_id + "_not_view").style.display = "";
        document.getElementById(image_id).style.display = "";
}

//一部の履歴上にある画像の表示
function exchange_part_history_image_view() {
        overview("on", "4")
}

//履歴上にある画像の非表を切り替え
function exchange_history_image_not_view(image_id) {
        document.getElementById(image_id).style.display = "none";
        document.getElementById(image_id + "_view_all").style.display = "";
        document.getElementById(image_id + "_not_view").style.display = "none";
}

//対応からたどる
function trace_history(num) {
        // 状況・人間
        // numがdata2の対応

        // 対応
        // data2のnumの状況・人間、data2が一緒の対応
        // console.log(num + "::");
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"]),
                        num: num,
                        mode: "trace"
                },
                success: function (data) {
                        overview("on", "5");
                        $("#id23").empty();
                        $("#id4").empty();

                        // ソート
                        data.sort(function (a, b) {
                                if (Number(a.num) < Number(b.num)) return 1;
                                if (Number(a.num) > Number(b.num)) return -1;
                                return 0;
                        });

                        var add = "", class_name, color;
                        for (var i = data.length - 1; i > -1; i--) {
                                if (data[i].id == "2") {
                                        class_name = "block1";
                                        color = "#f7fdc4";
                                }
                                else if (data[i].id == "3") {
                                        class_name = "block2";
                                        color = "#fff8ef";
                                }
                                else if (data[i].id == "4") {
                                        class_name = "block1";
                                        color = "#e0ffff";
                                }

                                //全ての履歴
                                if (data[i].id == "4")
                                        add = "<div class='" + class_name + "' style='width:90%;left:4%;font-size: 13px;border:1px solid green;border-top:0px solid green;background: " + color + ";'>";
                                else
                                        add = "<div class='" + class_name + "' style='width:90%;left:4%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                                add += set_history_data(data[i], "trace");
                                add += "</div> ";
                                if (data[i].id == "2" || data[i].id == "3")
                                        $("#id23").append(add);
                                else if (data[i].id == "4")
                                        $("#id4").append(add);
                        }
                        // console.log(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        console.log("トレースエラー");
                        console.log("XMLHttpRequest::" + XMLHttpRequest);
                        console.log("textStatus::" + textStatus);
                        console.log("errorThrown::" + errorThrown);
                }
        });
}

function overview(h, n) {
        if (h == "on") {
                document.getElementById("black_box").style.display = "";
                if (n == "1")
                        document.getElementById("theme_detail_box").style.display = "";
                else if (n == "2")
                        document.getElementById("overview_detail_box").style.display = "";
                else if (n == "3")
                        document.getElementById("situation_detail_box").style.display = "";
                else if (n == "4")
                        document.getElementById("history_image_detail_box").style.display = "";
                else if (n == "5")
                        document.getElementById("trace_box").style.display = "";
                else if (n == "6")
                        document.getElementById("finish").style.display = "";
        } else if (h == "off") {
                document.getElementById("black_box").style.display = "none";
                document.getElementById("theme_detail_box").style.display = "none";
                document.getElementById("overview_detail_box").style.display = "none";
                document.getElementById("situation_detail_box").style.display = "none";
                document.getElementById("history_image_detail_box").style.display = "none";
                document.getElementById("trace_box").style.display = "none";
                document.getElementById("finish").style.display = "none";
        }
}

//終了が確定した時の処理
function finish() {
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/time.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"]),
                        mode: "finish"
                },
                success: function (data) {
                        window.location.href = "finish.html";
                        // console.log(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        console.log("えらー:" + textStatus);
                }
        });
}


function get_reuse() {
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/reuse.php",
                data: {
                },
                success: function (data) {
                        // ソート
                        data.sort(function (a, b) {
                                if (Number(a.num) < Number(b.num)) return -1;
                                if (Number(a.num) > Number(b.num)) return 1;
                                return 0;
                        });

                        var first_human_card_data = 1, first_situation_card_data = 1;
                        // data = data[0];
                        console.log(data);
                        var add = "", class_name, color;
                        for (var i = data.length - 1; i > -1; i--) {

                                if (data[i].id == "2") {
                                        class_name = "block1";
                                        color = "#f7fdc4";
                                }
                                else if (data[i].id == "3") {
                                        class_name = "block2";
                                        color = "#fff8ef";
                                }
                                else if (data[i].id == "4") {
                                        class_name = "block1";
                                        color = "#e0ffff";
                                }
                                // console.log(i);
                                // console.log(data[i].id);

                                //再利用
                                if (first_human_card_data == 1 && data[i].id == "3") {
                                        add = "<div class='" + class_name + "' style='width:60%;left:7%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                                        first_human_card_data = 0;
                                }
                                else if (first_situation_card_data == 1 && data[i].id == "2") {
                                        add = "<div class='" + class_name + "' style='width:60%;left:7%;font-size: 13px;border:1px solid green;background: " + color + ";'>";
                                        first_situation_card_data = 0;
                                }
                                else
                                        add = "<div class='" + class_name + "' style='width:60%;left:7%;font-size: 13px;border:1px solid green;border-top:0px solid green;background: " + color + ";'>";

                                add += i + set_history_data(data[i], "all");
                                add += '<br><center><input type="button" value="再利用" onclick="reuse_select(' + data[i].num + ')"></center></div >';
                                if (data[i].id == "2")
                                        $("#reuse_situation_select_add").append(add);
                                else if (data[i].id == "3")
                                        $("#reuse_human_select_add").append(add);
                        }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        // alert('エラーです！'); //エラーを表示
                        console.log("data");
                }
        });
}