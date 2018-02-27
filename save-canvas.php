<?php
$img = $_POST['imgBase64'];
$user_id = $_POST['user_id'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
$fileName = 'photos/' . $user_id . '/final.png';
file_put_contents($fileName, $fileData);
die('save image ok' . $user_id);
