<?php
// 一時アップロード先ファイルパス
$file_tmp = $_FILES["image_file"]["tmp_name"];

// 正式保存先ファイルパス
$file_save = "/var/www/html/save/" . $_FILES["image_file"]["name"];

// ファイル移動
$result = @move_uploaded_file($file_tmp, $file_save);
if ($result === true) {
        echo "UPLOAD OK";
} else {
        echo "UPLOAD NG";
}
?>