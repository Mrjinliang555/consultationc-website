<?php

include_once './fn.php';


$responseStasus = "222";
$responseMsg = "图片保存失败";
$responseDate = null;

// echo $_POST["picture"];
$file = $_FILES["picture"];

if( $file && $file['error'] == 0 ){
    // print_r($file);
    $responseStasus = "000";
    $responseMsg = "图片保存成功";
    $ext = strrchr($file['name'],'.');
    $responseDate = time().rand(111,999).$ext;
    $newName = '../upload/'.$responseDate;
    move_uploaded_file($file['tmp_name'],$newName);
}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data'=> $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);



?>