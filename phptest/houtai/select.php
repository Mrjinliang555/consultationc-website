<?php 

include_once './fn.php';
$responseStasus = "222";
$responseMsg = "查询失败";
$responseDate = null;

$arr = ["t_bannerlist"];
$index = $_GET["index"];

if( $index || $index === "0" ){

    $index = intval($index);
    $table = $arr[$index];


    $sql ="SELECT * FROM ".$table; 

    $res = my_query( $sql );

    if( $res ) {
        $responseDate = $res;
        $responseStasus = "000";
        $responseMsg = "查询成功";
    }

}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate  );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);




















?>