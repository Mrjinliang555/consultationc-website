<?php 


include_once './fn.php';
$responseStasus = "222";
$responseMsg = "暂无数据";
$responseDate = null;


$sql ="SELECT * FROM t_news_classification"; 

$res = my_query( $sql );

if( $res ) {
    $responseDate = $res;
    $responseStasus = "000";
    $responseMsg = "查询成功";
}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);

?>