<?php 


include_once './fn.php';
$responseStasus = "222";
$responseMsg = "暂无数据";
$responseDate = null;
$count = 0;


$page = @$_GET["page"];
$size = @$_GET["size"];

if( !$size ) {
    $size = 5;
}

if( !$page ) {
    $page = 1;
}

$start = ($page-1)*$size;

// $sql ="SELECT * FROM t_article limit $start, $size";
$sql ="SELECT * FROM t_article";
// $sqlCount = "select count(*) as count from t_article";

$res = my_query( $sql );

// $resCount = my_query( $sqlCount );

if( $res ) {
    $count = count($res);
    $responseDate = array_slice($res,$start, $size);
    $responseStasus = "000";
    $responseMsg = "查询成功";
}

// if( $resCount ){
//     $count = $resCount[0]["count"];
// }

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate, 'count'=> $count);
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);

?>