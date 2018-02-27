<?php
require 'filter.php';

if (isset($_POST) && isset($_FILES['file'])) {
    // tao folder cho tung user
    $directory_user = 'photos/' . $_POST["user_id"];
    if (!file_exists($directory_user)) {
        mkdir($directory_user, 0777, true);
        die('thu muc khong ton tai, tao thu muc');
    }

    $target_dir = $directory_user;
//    $target_file = $target_dir . '/original.png';
    $user_id = $_POST["user_id"];

    $duoi = explode('.', $_FILES['file']['name']); // tách chuỗi khi gặp dấu .
    $duoi = $duoi[(count($duoi) - 1)];//lấy ra đuôi file
    //Kiểm tra xem có phải file ảnh không
    if ($duoi === 'jpg' || $duoi === 'png') {
        //tiến hành upload
        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_dir . '/original.' . $duoi)) {
            //Nếu thành công
            imagepng(imagecreatefromstring(file_get_contents($target_dir . '/original.' . $duoi)), $target_dir . "/original.png");

            $link_winter = winter($user_id, $duoi);
            $link_summer = summer($user_id, $duoi);
            $link_vintage = vintage($user_id, $duoi);
            $link_fresh_blue = fresh_blue($user_id, $duoi);
//            $links = json_encode(array('winter' => $link_winter, 'summer' => $link_summer, 'vintage' => $link_vintage, 'fresh_blue' => $link_fresh_blue));

            die('upload ok');

        } else { //nếu k thành công
            die('Có lỗi!'); //in ra thông báo

        }
    } else { //nếu k phải file ảnh
        die('Chỉ được upload ảnh'); //in ra thông báo

    }
} else {
    die('Lock'); // nếu không phải post method

}
