<?php
/**
 * Created by PhpStorm.
 * User: alphonse
 * Date: 16/4/17
 * Time: 上午2:33
 */
include('connect.php');

$type = $_POST['type'];
$field = $_POST['field'];



$sql = "SELECT * FROM $type WHERE type = '$field'";
$res = mysql_query($sql);
$i = 0;
$feedback = array();



while($data = mysql_fetch_array($res))
{
    if (!empty($data['img']))
    {
        $img = $data['img'];
    }elseif (empty($data['img2'])) {
        $img = array($data['img1']);
    } elseif (empty($data['img3'])) {
        $img = array(
            $data['img1'],
            $data['img2']
        );
    } elseif (empty($data['img4'])) {
        $img = array(
            $data['img1'],
            $data['img2'],
            $data['img3']
        );
    } elseif (empty($data['img5'])) {
        $img = array(
            $data['img1'],
            $data['img2'],
            $data['img3'],
            $data['img4']
        );
    } else {
        $img = array(
            $data['img1'],
            $data['img2'],
            $data['img3'],
            $data['img4'],
            $data['img5']
        );
    }

    $feedback[$i] = array(
        'id' => $data['id'],
        'title' => urlencode($data['title']),
        'type' => urlencode($data['type']),
        'description' => urlencode($data['description']),
        'img' => $img
    );
    $i++;
}

echo urldecode(json_encode($feedback));
?>

