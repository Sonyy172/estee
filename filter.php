<?php

function winter($user_id, $file_type)
{
    if ($file_type == 'png') {
        $image = imagecreatefrompng('photos/' . $user_id . '/original.png');
    } else {
        $image = imagecreatefromjpeg('photos/' . $user_id . '/original.jpg');
    }

    imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
    imagefilter($image, IMG_FILTER_CONTRAST, -50);
    imagepng($image, 'photos/' . $user_id . '/winter.png');
    imagedestroy($image);
    $link = 'photos/' . $user_id . '/winter.png';
    return $link;
}

function vintage($user_id, $file_type)
{
    if ($file_type == 'png') {
        $image = imagecreatefrompng('photos/' . $user_id . '/original.png');
    } else {
        $image = imagecreatefromjpeg('photos/' . $user_id . '/original.jpg');
    }
    imagefilter($image, IMG_FILTER_BRIGHTNESS, 10);
    imagefilter($image, IMG_FILTER_GRAYSCALE);
    imagefilter($image, IMG_FILTER_COLORIZE, 40, 10, -15);
    imagepng($image, 'photos/' . $user_id . '/vintage.png');
    imagedestroy($image);
    $link = 'photos/' . $user_id . '/vintage.png';
    return $link;
}

function fresh_blue($user_id, $file_type)
{
    if ($file_type == 'png') {
        $image = imagecreatefrompng('photos/' . $user_id . '/original.png');
    } else {
        $image = imagecreatefromjpeg('photos/' . $user_id . '/original.jpg');
    }
    imagefilter($image, IMG_FILTER_CONTRAST, -5);
    imagefilter($image, IMG_FILTER_COLORIZE, 20, 0, 80, 60);
    imagepng($image, 'photos/' . $user_id . '/fresh.png');
    imagedestroy($image);
    $link = 'photos/' . $user_id . '/fresh.png';
    return $link;
}

function summer($user_id, $file_type)
{
    if ($file_type == 'png') {
        $image = imagecreatefrompng('photos/' . $user_id . '/original.png');
    } else {
        $image = imagecreatefromjpeg('photos/' . $user_id . '/original.jpg');
    }
    imagefilter($image, IMG_FILTER_COLORIZE, 0, 150, 0, 50);
    imagefilter($image, IMG_FILTER_NEGATE);
    imagefilter($image, IMG_FILTER_COLORIZE, 25, 50, 0, 50);
    imagefilter($image, IMG_FILTER_NEGATE);
    imagepng($image, 'photos/' . $user_id . '/summer.png');
    imagedestroy($image);
    $link = 'photos/' . $user_id . '/summer.png';
    return $link;
}

?>