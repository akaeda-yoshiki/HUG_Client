var assessment_send = [], category_send, time_send = "", image_send = "";//登録時に送信する用
var mode = "new";//新規作成か再利用の識別変数
var assessment_data = [];
function get_assessment() {

        var list = '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5" selected>5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>';
        $.ajax({ //非同期通信
                type: "POST",
                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
                data: {
                        code: window.sessionStorage.getItem(["eventcode"])
                },
                success: function (data1) {
                        // alert(data1);
                        $.ajax({ //非同期通信
                                type: "POST",
                                url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/theme.php",
                                data: {
                                        id: data1
                                },
                                success: function (data) {
                                        var text1 = '<br><a style="position: relative;left: 140px;">';
                                        var text2 = '：</a><select id="assessment_list';
                                        var text3 = '" style="position: relative;width: 50px;left: 158px;">';

                                        var add = "";
                                        add += '<a style="position: relative;left: 40px;">' + data[0].assessment0 + '：</a>';
                                        add += '<select id="assessment_list' + 0 + '" style="position: relative;width: 50px;left: 60px;">';
                                        $("#assessment_list").append(add + list);
                                        assessment_data.push(data[0].assessment0);
                                        if (data[0].assessment1 != "") { $("#assessment_list").append(text1 + data[0].assessment1 + text2 + 1 + text3 + list); assessment_data.push(data[0].assessment1); }
                                        if (data[0].assessment2 != "") { $("#assessment_list").append(text1 + data[0].assessment2 + text2 + 2 + text3 + list); assessment_data.push(data[0].assessment2); }
                                        if (data[0].assessment3 != "") { $("#assessment_list").append(text1 + data[0].assessment3 + text2 + 3 + text3 + list); assessment_data.push(data[0].assessment3); }
                                        if (data[0].assessment4 != "") { $("#assessment_list").append(text1 + data[0].assessment4 + text2 + 4 + text3 + list); assessment_data.push(data[0].assessment4); }
                                        if (data[0].assessment5 != "") { $("#assessment_list").append(text1 + data[0].assessment5 + text2 + 5 + text3 + list); assessment_data.push(data[0].assessment5); }
                                        if (data[0].assessment6 != "") { $("#assessment_list").append(text1 + data[0].assessment6 + text2 + 6 + text3 + list); assessment_data.push(data[0].assessment6); }
                                        if (data[0].assessment7 != "") { $("#assessment_list").append(text1 + data[0].assessment7 + text2 + 7 + text3 + list); assessment_data.push(data[0].assessment7); }
                                        if (data[0].assessment8 != "") { $("#assessment_list").append(text1 + data[0].assessment8 + text2 + 8 + text3 + list); assessment_data.push(data[0].assessment8); }
                                        if (data[0].assessment9 != "") { $("#assessment_list").append(text1 + data[0].assessment9 + text2 + 9 + text3 + list); assessment_data.push(data[0].assessment9); }

                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                                        // alert('エラーです！'); //エラーを表示
                                        console.log("えらー:" + textStatus);
                                }
                        });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
                        // alert('エラーです！'); //エラーを表示
                }
        });
}


//次へボタンが押された時
function next(h) {
        var required_flag = true;//入力必須事項の確認用

        if (h == "situation") {
                var get1 = document.forms.input1;

                error_reset();
                // 状況
                $("#situation_text").empty();
                $("#situation_text").append(get1.situation.value);
                if (get1.situation.value == "") {
                        required_flag = false;
                        document.getElementById("situation_input_text").style.color = "red";
                }

                // 評価項目
                $("#assessment_text").empty();
                for (var i = 0; i < assessment_data.length; i++) {
                        if (i != 0)
                                $("#assessment_text").append('<a style="position: relative;left: 135px;">' + assessment_data[i] + "：" + document.getElementById("assessment_list" + i).value + '</a>');
                        else
                                $("#assessment_text").append('<a style="position: relative;left: 36px;">' + assessment_data[i] + "：" + document.getElementById("assessment_list" + i).value + '</a>');
                        $("#assessment_text").append("<br>");
                        assessment_send.push(document.getElementById("assessment_list" + i).value);
                }



                // 入力必須事項の確認
                if (required_flag == true) {
                        document.getElementById("required_error").style.display = "none";
                        document.getElementById("situation_card").style.display = "none";
                        document.getElementById("confirm_situation").style.display = "";
                        document.getElementById("required_error").style.display = "none";

                }
                else {
                        document.getElementById("required_error").style.display = "";

                }
        }
        else if (h == "human") {
                var get1 = document.forms.input_human;
                $("#feature_text").empty();
                $("#feature_text").append(get1.feature.value);
                if (get1.feature.value == "") {
                        required_flag = false;
                        document.getElementById("feature_input_text").style.color = "red";
                }
                $("#age_text").empty();
                $("#age_text").append(get1.age.value);
                if (get1.age.value == "") {
                        required_flag = false;
                        document.getElementById("age_input_text").style.color = "red";
                }


                $("#sex_text").empty();
                $("#sex_text").append(get1.sex.value);
                if (get1.sex.value == "") {
                        required_flag = false;
                        document.getElementById("sex_input_text").style.color = "red";
                }


                // 入力必須事項の確認
                if (required_flag == true) {
                        document.getElementById("required_error").style.display = "none";
                        document.getElementById("human_card").style.display = "none";
                        document.getElementById("confirm_human").style.display = "";
                        document.getElementById("required_error").style.display = "none";
                }
                else {
                        document.getElementById("required_error").style.display = "";
                }
        }
}

//訂正ボタンが押された
function back(h) {
        if (h == "situation") {
                document.getElementById("situation_card").style.display = "";
        }
        else if (h == "human") {
                document.getElementById("human_card").style.display = "";
        }
        document.getElementById("required_error").style.display = "";
        document.getElementById("confirm_situation").style.display = "none";
        document.getElementById("confirm_human").style.display = "none";
        document.getElementById("required_error").style.display = "none";
}


function file(num) {
        var form = document.getElementById("file_input");
        var formdata = new FormData(form);
        // console.log();
        // if (form != "")
        $.ajax({
                type: 'POST',
                url: 'http://192.168.0.159/2018grade4/HUG/HUG_Server/file_upload.php?code=' + window.sessionStorage.getItem(["eventcode"]) + '&&num=' + num,
                data: formdata,
                processData: false,	// jQueryがデータを処理しないように設定
                contentType: false,	// jQueryがcontentTypeを設定しないように設定
                error: function (data) {
                        // console.log("error:" + data);
                        // alert("error:" + data);
                }
        });
}




//エラー系のリセット
function error_reset() {
        document.getElementById("required_error").style.display = "none";
        document.getElementById("situation_input_text").style.color = "";
        document.getElementById("feature_input_text").style.color = "";
        document.getElementById("age_input_text").style.color = "";
        document.getElementById("sex_input_text").style.color = "";
}




//再利用するデータを決めたとき
function reuse_select(select_num) {
        // select_num = select_num.split("_");
        // var code = select_num[1];
        // $.ajax({ //非同期通信
        //         type: "POST",
        //         url: "http://192.168.0.159/2018grade4/HUG/HUG_Server/eventcode.php",
        //         data: {
        //                 code: code,
        //                 num: select_num[0]
        //         },
        //         success: function (data) {
        //                 console.log(data);
        //                 if (data[0].id == "2") {
        //                         var get1 = document.forms.input1;
        //                         get1.situation.value = data[0].data1;
        //                         data[0].data2 = data[0].data2.split("/");
        //                         for (var i = 0; i < assessment_data.length; i++) {
        //                                 console.log(i);
        //                                 document.getElementById("assessment_list" + i).value = data[0].data2[i];
        //                         }
        //                         exchange_mode("new");
        //                 }
        //                 else if (data[0].id == "3") {
        //                         var get1 = document.forms.input_human;
        //                         get1.feature.value = data[0].data1;
        //                         get1.age.value = data[0].data2;
        //                         get1.sex.value = data[0].data3;
        //                         exchange_mode("new");
        //                 }
        //         },
        //         error: function (XMLHttpRequest, textStatus, errorThrown) { //接続が失敗
        //                 // alert('エラーです！'); //エラーを表示
        //                 console.log("data");
        //         }
        // });
        if (reuse_data[select_num].id == "2") {
                var get1 = document.forms.input1;
                get1.situation.value = reuse_data[select_num].data1;
                reuse_data[select_num].data2 = reuse_data[select_num].data2.split("/");
                for (var i = 0; i < assessment_data.length; i++) {
                        // console.log(i);
                        document.getElementById("assessment_list" + i).value = reuse_data[select_num].data2[i];
                }
                exchange_mode("new");
        }
        else if (reuse_data[select_num].id == "3") {
                var get1 = document.forms.input_human;
                get1.feature.value = reuse_data[select_num].data1;
                get1.age.value = reuse_data[select_num].data2;
                get1.sex.value = reuse_data[select_num].data3;
                exchange_mode("new");
        }
}

