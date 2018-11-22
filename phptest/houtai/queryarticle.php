<?php 


include_once './fn.php';
$responseStasus = "222";
$responseMsg = "暂无数据";
$responseDate = null;

$nowTime = @time();

$sql ="SELECT * FROM t_article where creatTime<$nowTime and effectiveTime>$nowTime and status='1'"; 

$res = my_query( $sql );

if( $res ) {
    $responseDate = $res;
    $responseStasus = "000";
    $responseMsg = "查询成功";
}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);

?>