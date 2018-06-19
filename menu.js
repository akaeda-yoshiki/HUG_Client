var word = Array("ホーム", "テーマ作成", "プレイ", "振り返り", "プロフィール", "ログアウト");
var fail_name = Array("home.html", "create_theme.html", "play.html", "reflection.html", "profile.html", "index.html");
// 各画面で共通部分
function write_header(faze) {
        var html = "";
        html += '<br>';
        //     html += '<system_name>';
        //     html += '入退室管理システム';
        //     html += '</system_name><br>';
        //     html += '<a style="margin-left : 540px">';
        //     html += '<a href="login.html" class="logout_btn">ログアウト</a>';
        //     html += '</a>';
        //     html += '<br>';
        //     html += '<br>';
        //     html += '<br>';
        switch (faze) {//引数によって選んでいる項目の淵を太枠で囲い、文字を青くする
                case 0://ホーム
                        html += '<a href=' + fail_name[0] + ' class="menu_btn_pushed">' + word[0] + '</a>';
                        html += '<a href=' + fail_name[1] + ' class="menu_btn">' + word[1] + '</a>';
                        html += '<a href=' + fail_name[2] + ' class="menu_btn">' + word[2] + '</a>';
                        html += '<a href=' + fail_name[3] + ' class="menu_btn">' + word[3] + '</a>';
                        html += '<a href=' + fail_name[4] + ' class="menu_btn">' + word[4] + '</a>';
                        // html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        html += '<a href=' + fail_name[5] + ' class="menu_btn">' + word[5] + '</a>';
                        break;
                case 1://テーマ作成
                        html += '<a href=' + fail_name[0] + ' class="menu_btn">' + word[0] + '</a>';
                        html += '<a href=' + fail_name[1] + ' class="menu_btn_pushed">' + word[1] + '</a>';
                        html += '<a href=' + fail_name[2] + ' class="menu_btn">' + word[2] + '</a>';
                        html += '<a href=' + fail_name[3] + ' class="menu_btn">' + word[3] + '</a>';
                        html += '<a href=' + fail_name[4] + ' class="menu_btn">' + word[4] + '</a>';
                        // html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        html += '<a href=' + fail_name[5] + ' class="menu_btn">' + word[5] + '</a>';
                        break;
                case 2://プレイ
                        html += '<a href=' + fail_name[0] + ' class="menu_btn">' + word[0] + '</a>';
                        html += '<a href=' + fail_name[1] + ' class="menu_btn">' + word[1] + '</a>';
                        html += '<a href=' + fail_name[2] + ' class="menu_btn_pushed">' + word[2] + '</a>';
                        html += '<a href=' + fail_name[3] + ' class="menu_btn">' + word[3] + '</a>';
                        html += '<a href=' + fail_name[4] + ' class="menu_btn">' + word[4] + '</a>';
                        // html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        html += '<a href=' + fail_name[5] + ' class="menu_btn">' + word[5] + '</a>';
                        break;
                case 3://振り返り
                        html += '<a href=' + fail_name[0] + ' class="menu_btn">' + word[0] + '</a>';
                        html += '<a href=' + fail_name[1] + ' class="menu_btn">' + word[1] + '</a>';
                        html += '<a href=' + fail_name[2] + ' class="menu_btn">' + word[2] + '</a>';
                        html += '<a href=' + fail_name[3] + ' class="menu_btn_pushed">' + word[3] + '</a>';
                        html += '<a href=' + fail_name[4] + ' class="menu_btn">' + word[4] + '</a>';
                        // html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        html += '<a href=' + fail_name[5] + ' class="menu_btn">' + word[5] + '</a>';
                        break;
                case 4://振り返り
                        html += '<a href=' + fail_name[0] + ' class="menu_btn">' + word[0] + '</a>';
                        html += '<a href=' + fail_name[1] + ' class="menu_btn">' + word[1] + '</a>';
                        html += '<a href=' + fail_name[2] + ' class="menu_btn">' + word[2] + '</a>';
                        html += '<a href=' + fail_name[3] + ' class="menu_btn">' + word[3] + '</a>';
                        html += '<a href=' + fail_name[4] + ' class="menu_btn_pushed">' + word[4] + '</a>';
                        // html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        html += '<a href=' + fail_name[5] + ' class="menu_btn">' + word[5] + '</a>';
                        break;
                default:
                        html += '<a href=' + fail_name[0] + ' class="menu_btn">' + word[0] + '</a>';
                        html += '<a href=' + fail_name[1] + ' class="menu_btn">' + word[1] + '</a>';
                        html += '<a href=' + fail_name[2] + ' class="menu_btn">' + word[2] + '</a>';
                        html += '<a href=' + fail_name[3] + ' class="menu_btn">' + word[3] + '</a>';
                        html += '<a href=' + fail_name[4] + ' class="menu_btn">' + word[4] + '</a>';
                        // html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        html += '<a href=' + fail_name[5] + ' class="menu_btn">' + word[5] + '</a>';
                        break;
        }

        document.write(html);//htmlに書き込み

}